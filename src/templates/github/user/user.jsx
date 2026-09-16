import { ActivityCalendar } from "../../../components/activity-calendar";
import { formatCount } from "../../../utils";

export function User({ user }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'MonaSans',
            width: 'auto',
            padding: '16px',
            backgroundColor: '#0d1117',
            borderRadius: '16px',
            border: '1px solid #3d444d',
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }}>
                <img width={50} height={50} src={user.avatar}
                    style={{
                        borderRadius: '8px'
                    }} />
                <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <span style={{
                        color: 'rgb(68, 147, 248)',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }} >{user.name}</span>
                    <span style={{
                        color: 'rgb(145, 152, 161)',
                        fontSize: '12px',
                        fontWeight: '500'
                    }} >@{user.username}</span>
                    <span style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1,
                        color: 'rgb(145, 152, 161)',
                        fontSize: '12px',
                        fontWeight: '500',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }} >{user.bio}</span>
                </div>
            </div>
            <div style={{
                display: 'flex',
                width: '100%',
                marginTop: '8px',
                marginBottom: '8px',
                alignItems: 'center',
                fontSize: '14px',
                color: 'white',
                justifyContent: 'space-around',
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} ><p style={{ marginBottom: '0' }}>{formatCount(user.followers)}</p><p style={{ fontSize: '12px', marginTop: '0' }}>Followers</p></div>
                <div style={{ width: '1px', height: '16px', backgroundColor: '#2f353d' }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} ><p style={{ marginBottom: '0' }}>{formatCount(user.totalStars)}</p><p style={{ fontSize: '12px', marginTop: '0' }}>Stargazers</p></div>
                <div style={{ width: '1px', height: '16px', backgroundColor: '#2f353d' }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} ><p style={{ marginBottom: '0' }}>{user.totalRepos}</p><p style={{ fontSize: '12px', marginTop: '0' }}>Repositories</p></div>
                <div style={{ width: '1px', height: '16px', backgroundColor: '#2f353d' }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} ><p style={{ marginBottom: '0' }}>{user.contributionsLastYear}</p><p style={{ fontSize: '12px', marginTop: '0' }}>Contributions - 12mo</p></div>
            </div>
            <ActivityCalendar data={user.contributionDays} />
        </div>
    )
}