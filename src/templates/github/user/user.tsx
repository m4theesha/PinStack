import {ActivityCalendar} from "../../../components/activity-calendar";
import {formatCount} from "../../../utils";
import type {UserData, ThemeData} from "../../../types.ts";

export function GitHubUser({user, theme}: { user: UserData; theme: ThemeData }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'MonaSans',
            width: 'auto',
            padding: '16px',
            backgroundColor: theme.background,
            borderRadius: '16px',
            border: `1px solid ${theme.border}`,
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }}>
                <img width={50} height={50} src={user.avatar}
                     style={{
                         borderRadius: '8px'
                     }}/>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <span style={{
                        color: theme.link,
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }}>{user.name}</span>
                    <span style={{
                        color: theme.text_muted,
                        fontSize: '12px',
                        fontWeight: '500'
                    }}>@{user.username}</span>
                    <span style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1,
                        color: theme.text_muted,
                        fontSize: '12px',
                        fontWeight: '500',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>{user.bio}</span>
                </div>
            </div>
            <div style={{
                display: 'flex',
                width: '100%',
                marginTop: '8px',
                marginBottom: '8px',
                alignItems: 'center',
                fontSize: '14px',
                color: theme.text,
                justifyContent: 'space-around',
            }}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <p style={{marginBottom: '0'}}>{formatCount(user.followers)}</p>
                    <p style={{fontSize: '12px', marginTop: '0', color: theme.text_muted}}>Followers</p></div>
                <div style={{width: '1px', height: '16px', backgroundColor: theme.border}}></div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <p style={{marginBottom: '0'}}>{formatCount(user.totalStars)}</p>
                    <p style={{fontSize: '12px', marginTop: '0', color: theme.text_muted}}>Stargazers</p></div>
                <div style={{width: '1px', height: '16px', backgroundColor: theme.border}}></div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <p style={{marginBottom: '0'}}>{formatCount(user.totalRepos)}</p>
                    <p style={{fontSize: '12px', marginTop: '0', color: theme.text_muted}}>Repositories</p></div>
                <div style={{width: '1px', height: '16px', backgroundColor: theme.border}}></div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <p style={{marginBottom: '0'}}>{formatCount(user.contributionsLastYear)}</p>
                    <p style={{fontSize: '12px', marginTop: '0', color: theme.text_muted}}>Contributions - 12mo</p></div>
            </div>
            <ActivityCalendar data={user.contributionDays} theme={theme}/>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-start',
                gap: '4px',
                marginTop: '12px',
                fontSize: '12px',
                color: theme.text_muted
            }}>
                <span>Star</span>
                <em style={{color: theme.link}}>@m4theesha/pinstack</em>
                <span>on GitHub to support the project.</span>
            </div>
        </div>
    )
}