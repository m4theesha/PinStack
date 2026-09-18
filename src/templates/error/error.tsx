export function Error({ msg, code }: { msg: string, code: number }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'MonaSans',
            width: 'auto',
            padding: '16px',
            backgroundColor: "#FAD1D1",
            borderRadius: '6px',
            border: `1px solid #F17474`,
        }}>
            <div style={{ display: 'flex', color: '#E81717', fontSize: '16px', gap: '10px', alignItems: 'center' }}>
                <div style={{ display: 'flex' }}>{code}</div>
                <div style={{ height: '16px', width: '1px', backgroundColor: '#F17474' }}></div>
                <div style={{ display: 'flex' }}>{msg}</div>
            </div>
        </div>
    )
}