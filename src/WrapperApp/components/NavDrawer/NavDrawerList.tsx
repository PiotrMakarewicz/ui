import GitHubIcon from '@mui/icons-material/GitHub';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import {
	Box,
	Divider,
	IconButton,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	SxProps,
	Theme,
	Tooltip,
	Typography
} from '@mui/material';
import { ReactNode, SyntheticEvent, useMemo } from 'react';
import { DEMO_MODE } from '../../../config/Config';
import { useAuth } from '../../../services/AuthService';
import deployInfo from '../../../util/identify/deployInfo.json';
import { MenuOption } from './NavDrawer';

export type NavDrawerListProps = {
	tabsValue: string;
	menuOptions: MenuOption[];
	layout: 'open' | 'closed' | 'mobile';
	handleChange: (event: SyntheticEvent, value: string) => void;
};
type NavDrawerElementProps = {
	selected?: boolean;
	handleChange?: (event: SyntheticEvent, value: string) => void;
	secondaryAction?: ReactNode;
	menuOption: MenuOption;
	open: boolean;
	buttonProps?:
		| {
				type: 'button';
		  }
		| {
				type: 'link';
				href?: string;
		  }
		| {
				type: 'label';
		  };
	sx?: SxProps<Theme>;
};

export function NavDrawerList({
	menuOptions,
	layout,
	handleChange,
	tabsValue
}: NavDrawerListProps) {
	const { isAuthorized, user, logout } = useAuth();
	const userLogout = useMemo(
		() => (
			<Tooltip title={<Typography>{isAuthorized ? 'Log out' : 'Log in'}</Typography>}>
				<IconButton
					sx={
						layout === 'closed'
							? {
									marginTop: 5
							  }
							: {
									marginTop: 1,
									marginLeft: '100%',
									transform: 'translateX(-100%)'
							  }
					}
					onClick={event => {
						if (isAuthorized) logout();
						else handleChange(event, 'login');
					}}>
					{isAuthorized ? (
						<LogoutIcon
							sx={{
								fontSize: 14
							}}
						/>
					) : (
						<LoginIcon
							sx={{
								fontSize: 14
							}}
						/>
					)}
				</IconButton>
			</Tooltip>
		),
		[isAuthorized, layout, logout, handleChange]
	);
	const username = useMemo(
		() => (isAuthorized && user ? user.username : 'Log in'),
		[isAuthorized, user]
	);
	return (
		<Box
			sx={{
				display: 'grid',
				gridAutoRows: '1fr auto',
				height: 'calc(100% - 64px)'
			}}>
			{!DEMO_MODE ? (
				<Box>
					<NavDrawerElement
						menuOption={{
							label: username,
							richLabel: (
								<Typography
									sx={{
										textAlign: 'right',
										marginRight: 1,
										textOverflow: 'ellipsis',
										overflow: 'hidden'
									}}>
									{username}
								</Typography>
							),
							description:
								layout === 'open' ? (
									userLogout
								) : (
									<Typography
										sx={{
											marginTop: 4.5
										}}
									/>
								),
							value: 'deployInfo',
							disabled: false,
							icon: (
								<PersonIcon
									fontSize='large'
									sx={{
										marginBottom: !DEMO_MODE ? 4.5 : undefined
									}}
								/>
							)
						}}
						secondaryAction={layout === 'closed' ? userLogout : undefined}
						open={layout === 'open'}
						buttonProps={{
							type: 'label'
						}}
						sx={{
							minHeight: !DEMO_MODE ? 96 : 64
						}}
					/>
					<Divider />
				</Box>
			) : (
				<Box />
			)}
			<Box>
				{menuOptions.map(menuOption => (
					<NavDrawerElement
						key={menuOption.value}
						menuOption={menuOption}
						open={layout === 'open'}
						handleChange={handleChange}
						selected={menuOption.value === tabsValue}
					/>
				))}
			</Box>

			<Box />
			<Box
				sx={{
					marginTop: 'auto'
				}}>
				<Divider />
				<NavDrawerElement
					menuOption={{
						label: deployInfo.commit,
						value: 'deployInfo',
						disabled: false,
						info: (
							<>
								{`${deployInfo.date} ${deployInfo.commit}`}
								<br />
								{deployInfo.branch}
							</>
						),
						description: deployInfo.date,
						icon: <GitHubIcon fontSize='large' />
					}}
					open={layout === 'open'}
					buttonProps={{
						href: 'https://github.com/yaptide/ui/commit/' + deployInfo.commit,
						type: 'link'
					}}
				/>
			</Box>
		</Box>
	);
}

function NavDrawerElement({
	menuOption: { label, richLabel, value, disabled, info, description, icon },
	open,
	selected,
	secondaryAction,
	sx = {},
	handleChange = () => {},
	buttonProps = { type: 'button' }
}: NavDrawerElementProps) {
	const listItemContent = (
		<>
			<ListItemIcon
				sx={{
					minWidth: 0,
					mr: open ? 3 : 'auto',
					justifyContent: 'center'
				}}>
				{icon}
			</ListItemIcon>
			<ListItemText
				primary={richLabel ?? label}
				secondary={description}
				sx={{ opacity: open ? 1 : 0 }}
			/>
		</>
	);
	return (
		<Tooltip
			title={info ? <Typography>{info}</Typography> : undefined}
			placement='right'>
			<ListItem
				secondaryAction={secondaryAction}
				disablePadding
				sx={{ display: 'block' }}>
				{buttonProps.type === 'label' ? (
					<ListItem
						aria-label={label}
						sx={{
							minHeight: 64,
							justifyContent: open ? 'initial' : 'center',
							px: 2.5,
							...sx
						}}
						disabled={disabled}>
						{listItemContent}
					</ListItem>
				) : (
					<ListItemButton
						aria-label={label}
						sx={{
							minHeight: 64,
							justifyContent: open ? 'initial' : 'center',
							px: 2.5,
							...sx
						}}
						disabled={disabled}
						{...(buttonProps.type === 'link'
							? { component: 'a', href: buttonProps.href, target: '_blank' }
							: {})}
						selected={selected}
						onClick={event => handleChange(event, value)}>
						{listItemContent}
					</ListItemButton>
				)}
			</ListItem>
		</Tooltip>
	);
}