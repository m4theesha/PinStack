import { formatCount } from "../../../utils";

export function Repo({ repo }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'MonaSans',
            width: '430px',
            padding: '16px',
            backgroundColor: '#0d1117',
            borderRadius: 6,
            border: '1px solid #3d444d',
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '0px',
                gap: 10
            }}>
                <img width={20} height={20} src={repo.avatar} style={{
                    border: '1px solid #31343a',
                    borderRadius: repo.isOwnedByOrg ? '4px' : '100%',
                    marginBottom: '0px'
                }} />
                <span style={{
                    color: '#4493f8',
                    fontSize: '16px',
                    fontWeight: 500,
                    marginBottom: '0px'
                }}>
                    {repo.owner}/<span style={{ fontWeight: 'bold' }}>{repo.repoName}</span></span>
            </div>
            {repo.description && repo.description.trim() !== '' &&
                <p style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 400,
                    marginTop: '4px',
                    marginBottom: '0px'
                }}>{repo.description}</p>
            }
            <div style={{ display: 'flex', gap: '8px' }}>
                {repo.topics.slice(0, 4).map((topic) => (
                    <div key={topic} style={{
                        display: 'flex',
                        height: '22px',
                        alignItems: 'center',
                        backgroundColor: 'rgba(56, 139, 253, 0.1)',
                        color: 'rgb(68, 147, 248)',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        marginTop: '8px',
                        fontSize: '12px',
                        fontWeight: '500',
                        borderRadius: '24px'
                    }}>{topic}</div>
                ))}
            </div>
            <div style={{
                display: 'flex',
                fontSize: '12px',
                color: 'rgb(145, 152, 161)',
                alignItems: 'center',
                marginTop: '8px',
                gap: '8px'
            }}>
                <span style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor: repo.languageColor,
                    borderRadius: '100%'
                }}>
                </span>
                <span>{repo.language}</span>
                <span>·</span>
                <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"
                    style={{ display: 'flex', verticalAlign: 'text-bottom' }}>
                    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z">
                    </path>
                </svg>
                <span>{formatCount(repo.stargazers)}</span>
            </div>
        </div>
    )
}