import { useCallback } from 'react';

import { Estimator } from '../JsRoot/GraphData';
import { EditorJson } from '../ThreeEditor/js/EditorJson';
import { addCustomStoppingPowerTableToEditorJSON } from '../ThreeEditor/Simulation/CustomStoppingPower/CustomStoppingPower';
import { FilterJSON } from '../ThreeEditor/Simulation/Scoring/ScoringFilter';
import { ScoringManagerJSON } from '../ThreeEditor/Simulation/Scoring/ScoringManager';
import {
	isEditorJson,
	RequestCancelJob,
	RequestGetJobInputs,
	RequestGetJobLogs,
	RequestGetJobResults,
	RequestGetJobStatus,
	RequestGetPageContents,
	RequestGetPageStatus,
	RequestParam,
	RequestPostJob,
	RequestShConvert
} from '../types/RequestTypes';
import {
	currentJobStatusData,
	currentTaskStatusData,
	JobStatusCompleted,
	JobStatusData,
	JobStatusFailed,
	PlatformType,
	ResponseGetJobInputs,
	ResponseGetJobLogs,
	ResponseGetJobResults,
	ResponseGetJobStatus,
	ResponseGetPageContents,
	ResponsePostJob,
	ResponseShConvert,
	SimulationInfo,
	StatusState,
	YaptideResponse
} from '../types/ResponseTypes';
import { useCacheMap } from '../util/hooks/useCacheMap';
import { camelToSnakeCase } from '../util/Notation/Notation';
import { orderAccordingToList } from '../util/Sort';
import { ValidateShape } from '../util/Types';
import { SimulationSourceType } from '../WrapperApp/components/Simulation/RunSimulationForm';
import { useAuth } from './AuthService';
import { createGenericContext, GenericContextProviderProps } from './GenericContext';

export type JobLogs = {
	jobId: string;
} & ResponseGetJobLogs;

export type JobInputs = {
	jobId: string;
} & ResponseGetJobInputs;

export type JobResults = {
	jobId: string;
} & ResponseGetJobResults;

export type FullSimulationData = Omit<JobInputs & JobStatusData & JobResults, 'message'>;

export const fetchItSymbol = Symbol('fetchItSymbol');

export interface RestSimulationContext {
	postJobDirect: (...args: RequestPostJob) => Promise<ResponsePostJob>;
	postJobBatch: (...args: RequestPostJob) => Promise<ResponsePostJob>;
	cancelJob: (...args: RequestCancelJob) => Promise<unknown>;
	convertToInputFiles: (...args: RequestShConvert) => Promise<ResponseShConvert>;
	getHelloWorld: (...args: RequestParam) => Promise<unknown>;
	getJobStatus: (...args: RequestGetJobStatus) => Promise<JobStatusData | undefined>;
	getJobInputs: (...args: RequestGetJobInputs) => Promise<JobInputs | undefined>;
	getJobResults: (...args: RequestGetJobResults) => Promise<JobResults | undefined>;
	getJobLogs: (...args: RequestGetJobLogs) => Promise<JobLogs | undefined>;
	getPageContents: (...args: RequestGetPageContents) => Promise<ResponseGetPageContents>;
	getPageStatus: (...args: RequestGetPageStatus) => Promise<JobStatusData[] | undefined>;
	getFullSimulationData: (
		jobStatus: JobStatusData,
		signal?: AbortSignal,
		cache?: boolean
	) => Promise<FullSimulationData | undefined>;
}

const recreateOrderInEstimators = (
	estimators: Estimator[],
	scoringManagerJSON: ScoringManagerJSON
): Estimator[] => {
	return orderAccordingToList(
		estimators,
		scoringManagerJSON.outputs,
		'name',
		(e, o) => (e.scoringOutputJsonRef = o)
	);
};

const recreateRefToFilters = (estimators: Estimator[], FiltersJSON: FilterJSON[]): Estimator[] => {
	estimators.forEach(estimator => {
		const { pages, scoringOutputJsonRef } = estimator;
		pages.forEach((page, idx) => {
			const quantity = scoringOutputJsonRef?.quantities[idx];
			const filter = FiltersJSON.find(o => o.uuid === quantity?.filter);
			page.filterRef = filter;
			page.name = quantity?.name;
		});
	});

	return estimators;
};

export const recreateRefsInResults = (inputJson: EditorJson, estimators: Estimator[]) => {
	if (!inputJson) throw new Error('No editor data');
	if (!estimators) throw new Error('No esitamtors data');

	const { scoringManager }: EditorJson = inputJson;

	const estimatorsOrdered = recreateOrderInEstimators(estimators, scoringManager);
	const estimatorsWithFixedFilters = recreateRefToFilters(
		estimatorsOrdered,
		scoringManager.filters
	);

	return estimatorsWithFixedFilters;
};

const updateEstimators = (estimators: Estimator[]) => {
	for (const estimator of estimators) {
		estimator.name = estimator.name.replace(/_$/, '');
	}
};

const [useShSimulation, ShSimulationContextProvider] =
	createGenericContext<RestSimulationContext>();

const ShSimulation = ({ children }: GenericContextProviderProps) => {
	const { authKy } = useAuth();

	const statusDataCache = useCacheMap<JobStatusData>();
	const inputsCache = useCacheMap<JobInputs>();
	const resultsCache = useCacheMap<JobResults>();
	const logsCache = useCacheMap<JobLogs>();

	const getHelloWorld = useCallback(
		(signal?: AbortSignal) =>
			authKy
				.get(``, { signal })
				.json<YaptideResponse>()
				.then(r => !!r.message),
		[authKy]
	);

	/**
	 * Returns the endpoint based on the simulation info.
	 * If the platform is not known, it will return 'jobs/direct'.
	 * The platform name is stored in metadata of the simulation info and is typed by `PlatformType`.
	 * Endpoints are named after the platform types.
	 * @see PlatformType
	 * @param info - The simulation info object.
	 * @returns The endpoint string.
	 */
	const getEndpointFromSimulationInfo = (info: SimulationInfo) => {
		const platform =
			`jobs/${info.metadata.platform.toLowerCase()}` as `jobs/${Lowercase<PlatformType>}`;

		if (['jobs/direct', 'jobs/batch'].includes(platform)) return platform;
		console.error(`Simulation platform is unknown: ${info.metadata.platform}`);

		return 'jobs';
	};

	const postJob = useCallback(
		(endPoint: string) =>
			async (
				...[
					simData,
					inputType,
					ntasks,
					simType,
					title,
					batchOptions,
					signal
				]: RequestPostJob
			) => {
				if (title === undefined && isEditorJson(simData)) title = simData.project.title;
				const mapType: { [k in SimulationSourceType]: string } = {
					editor: 'json',
					files: 'files'
				};

				if (inputType === 'editor' && isEditorJson(simData)) {
					await addCustomStoppingPowerTableToEditorJSON(simData);
				}

				const filedName = mapType[inputType];

				if (filedName === undefined) throw new Error('Invalid input type ' + inputType);

				return authKy
					.post(endPoint, {
						json: {
							[`input_${filedName}`]: simData,
							...camelToSnakeCase(
								{
									inputType,
									ntasks,
									simType,
									title,
									batchOptions
								},
								true
							)
						},
						signal,
						timeout: 30000
						/**
						 * Timeout in milliseconds for getting a response. Can not be greater than 2147483647.
						 * If set to `false`, there will be no timeout.
						 * */
					})
					.json<ResponsePostJob>();
			},
		[authKy]
	);

	const convertToInputFiles = useCallback(
		(...[simData, signal]: RequestShConvert) =>
			authKy
				.post(`sh/convert`, {
					signal,
					json: simData
				})
				.json<ResponseShConvert>(),
		[authKy]
	);

	const getJobInputs = useCallback(
		async (...[info, signal, cache = true, beforeCacheWrite]: RequestGetJobInputs) => {
			const { jobId } = info;

			if (cache && inputsCache.has(jobId)) return Promise.resolve(inputsCache.get(jobId));

			const cachePromise = inputsCache.createPromise(
				async resolve => {
					const response = await authKy
						.get('inputs', {
							signal,
							searchParams: camelToSnakeCase({ jobId })
						})
						.json<ResponseGetJobInputs>();

					const data: JobInputs = {
						...response,
						jobId
					};
					resolve(data);
				},
				jobId,
				beforeCacheWrite
			);

			return await cachePromise;
		},
		[authKy, inputsCache]
	);

	const getJobLogs = useCallback(
		async (...[info, signal, cache = true, beforeCacheWrite]: RequestGetJobLogs) => {
			const { jobId } = info;

			if (cache && logsCache.has(jobId)) return Promise.resolve(logsCache.get(jobId));

			const cachePromise = logsCache.createPromise(
				async resolve => {
					const response = await authKy
						.get('logfiles', {
							signal,
							searchParams: camelToSnakeCase({ jobId })
						})
						.json<ResponseGetJobLogs>();

					const data: JobLogs = {
						...response,
						jobId
					};
					resolve(data);
				},
				jobId,
				beforeCacheWrite
			);

			return await cachePromise;
		},
		[authKy, logsCache]
	);

	const getJobResults = useCallback(
		async (...[info, signal, cache = true, beforeCacheWrite]: RequestGetJobResults) => {
			const { jobId } = info;

			if (cache && resultsCache.has(jobId)) return Promise.resolve(resultsCache.get(jobId));

			const cachePromise = resultsCache.createPromise(
				async resolve => {
					const response = await authKy
						.get('results', {
							signal,
							searchParams: camelToSnakeCase({ jobId })
						})
						.json<ResponseGetJobResults>();

					updateEstimators(response.estimators);

					const jobInputs = await getJobInputs(info, signal, cache);

					const refsInResults =
						jobInputs?.input.inputJson &&
						recreateRefsInResults(jobInputs.input.inputJson, response.estimators);

					const data: JobResults = {
						...response,
						jobId,
						estimators: refsInResults ?? response.estimators
					};

					resolve(data);
				},
				jobId,
				beforeCacheWrite
			);

			return await cachePromise;
		},
		[authKy, getJobInputs, resultsCache]
	);

	//TODO: fix backend responses and remove this function
	const validStatusToCache = (data: JobStatusCompleted | JobStatusFailed) => {
		if (data.jobState === StatusState.FAILED) return true;

		return data.jobTasksStatus.every(task => {
			if (currentTaskStatusData[StatusState.FAILED](task)) return true;
			else if (currentTaskStatusData[StatusState.COMPLETED](task)) {
				if (!task.startTime || !task.endTime)
					console.warn('There are missing times in COMPLETED task:', task);

				if (task.requestedPrimaries !== task.simulatedPrimaries) {
					console.warn(
						'Requested primaries and simulated primaries are not equal in COMPLETED task:',
						task
					);
					task.simulatedPrimaries = task.requestedPrimaries;
				}

				return true;
			}

			return false;
		});
	};

	const getJobStatus = useCallback(
		(...[info, cache = true, beforeCacheWrite, signal]: RequestGetJobStatus) =>
			(endpoint: string) => {
				const { jobId } = info;

				if (cache && statusDataCache.has(jobId))
					return Promise.resolve<JobStatusData>({
						...statusDataCache.get(jobId),
						...info
					});

				return authKy
					.get(endpoint, {
						signal,
						searchParams: camelToSnakeCase({ jobId })
					})
					.json<ResponseGetJobStatus>()
					.then(response => {
						const data = {
							...response,
							...info
						};

						if (currentJobStatusData[StatusState.PENDING](data)) {
						} else if (currentJobStatusData[StatusState.RUNNING](data)) {
						} else if (currentJobStatusData[StatusState.FAILED](data)) {
							console.log(data.message);

							statusDataCache.set(data.jobId, data, beforeCacheWrite);
						} else if (currentJobStatusData[StatusState.COMPLETED](data)) {
							if (validStatusToCache(data))
								statusDataCache.set(data.jobId, data, beforeCacheWrite);
						} else if (currentJobStatusData[StatusState.CANCELED](data)) {
							statusDataCache.set(data.jobId, data, beforeCacheWrite);
						} else return undefined;

						return data;
					})
					.catch(e => {
						console.error(e);

						return undefined;
					});
			},
		[authKy, statusDataCache]
	);

	const cancelJob = useCallback(
		(...[info, signal]: RequestCancelJob) =>
			authKy
				.delete(getEndpointFromSimulationInfo(info), {
					signal,
					searchParams: camelToSnakeCase({ jobId: info.jobId })
				})
				.then(() => {
					statusDataCache.delete(info.jobId);
				}),
		[authKy, statusDataCache]
	);

	const getPageContents = useCallback(
		(...[pageIdx, pageSize, orderType, orderBy, signal]: RequestGetPageContents) =>
			authKy
				.get(`user/simulations`, {
					signal,
					searchParams: camelToSnakeCase({ pageIdx, pageSize, orderType, orderBy })
				})
				.json<ResponseGetPageContents>(),
		[authKy]
	);

	const getPageStatus = useCallback(
		(...[infoList, cache = true, beforeCacheWrite, signal]: RequestGetPageStatus) => {
			return Promise.all(
				infoList.map(info => {
					if (info.metadata.platform === undefined) {
						console.error('info.metadata.platform is undefined');

						return undefined;
					}

					return getJobStatus(info, cache, beforeCacheWrite, signal)('jobs');
				})
			).then(dataList => {
				const data = dataList.filter(data => data !== undefined) as JobStatusData[];

				return data.length === 0 ? undefined : data;
			});
		},
		[getJobStatus]
	);

	const getFullSimulationData = useCallback(
		async (jobStatus: JobStatusData, signal?: AbortSignal, cache = true) => {
			const inputs: JobInputs | undefined = await getJobInputs(jobStatus, signal, cache);
			const results: JobResults | undefined =
				jobStatus.jobState === StatusState.COMPLETED
					? await getJobResults(jobStatus, signal, cache)
					: undefined;

			if (!inputs || !results) return undefined;
			const { message, ...mergedData } = {
				...inputs,
				...results,
				...jobStatus
			};

			const simData: FullSimulationData = mergedData satisfies ValidateShape<
				typeof mergedData,
				FullSimulationData
			>;

			return simData;
		},
		[getJobInputs, getJobResults]
	);

	return (
		<ShSimulationContextProvider
			value={{
				postJobDirect: postJob('jobs/direct'),
				postJobBatch: postJob('jobs/batch'),
				cancelJob,
				convertToInputFiles,
				getHelloWorld,
				getJobStatus: (...args: RequestGetJobStatus) => {
					return getJobStatus(...args)(getEndpointFromSimulationInfo(args[0]));
				},
				getPageContents,
				getPageStatus,
				getJobInputs,
				getJobResults,
				getJobLogs,
				getFullSimulationData
			}}>
			{children}
		</ShSimulationContextProvider>
	);
};

export { ShSimulation, useShSimulation };
