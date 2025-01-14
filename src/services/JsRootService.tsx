import { useEffect, useRef, useState } from 'react';
import makeAsyncScriptLoader from 'react-async-script';

import { createGenericContext, GenericContextProviderProps } from './GenericContext';

// submodule copy of JSROOT v6.3.4
// https://github.com/root-project/jsroot/tree/6.3.4
const JsRootUrl = process.env.PUBLIC_URL + `/libs/jsroot/scripts/JSRoot.core.js`;
const JsRootPainterUrl = process.env.PUBLIC_URL + `/libs/jsroot/scripts/JSRoot.painter.js`;
const JsRootKey = 'JSROOT';

declare global {
	interface Window {
		[JsRootKey]: Record<string, any>;
	}
}

export type JsRootWindow = Pick<Window, typeof JsRootKey>;

const [useJSROOT, JsRootContextProvider] = createGenericContext<JsRootWindow>();

const JsRoot = ({ children, JSROOT }: GenericContextProviderProps<Partial<JsRootWindow>>) => {
	const [value, setValue] = useState<JsRootWindow>();
	const painterScript = useRef<HTMLScriptElement>();

	useEffect(() => {
		if (!JSROOT || painterScript.current) return;

		const script = document.createElement('script');

		script.src = JsRootPainterUrl;
		script.async = true;

		const handler = {
			set: function (obj: object, prop: PropertyKey, value: any) {
				Reflect.set(obj, prop, value);

				if (prop === 'Painter') {
					// detect JSROOT.Painter loaded
					setValue({ JSROOT: window.JSROOT });
					painterScript.current = script;
				}

				return true;
			}
		};
		const proxyJsRoot = new Proxy(window.JSROOT, handler);
		window.JSROOT = proxyJsRoot;

		document.body.appendChild(script);
	}, [JSROOT]);

	useEffect(() => {
		return () => {
			if (painterScript.current) {
				painterScript.current.remove();
				painterScript.current = undefined;
			}
		};
	}, []);

	return <JsRootContextProvider value={value}>{value?.JSROOT && children}</JsRootContextProvider>;
};

const AsyncLoaderJsRoot = makeAsyncScriptLoader(JsRootUrl, {
	globalName: JsRootKey
})(JsRoot);

export { JsRootKey, AsyncLoaderJsRoot as JsRootService, JsRootUrl, useJSROOT };
