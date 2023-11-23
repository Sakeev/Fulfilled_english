export const styles = {
    '.MuiPagination-ul ': {
        gap: '0.375em',
        '.MuiButtonBase-root': {
            height: '1.75rem',
            width: '1.75rem',
            backgroundColor: '#F2F2F2',
            margin: '0',
            padding: '0',
            borderRadius: '0.75em',
            transition: 'background-color 0.3s',
            boxShadow: 'none',
            '&:hover': {
                backgroundColor: '#DBF5EC',
            },
        },
        '.MuiButtonBase-root.Mui-selected': {
            backgroundColor: '#83C5BE',
        },
        '.MuiPaginationItem-ellipsis': {
            display: 'grid',
            placeItems: 'center',
            backgroundColor: '#F2F2F2',
            height: '1.75rem',
            width: '1.75rem',
            borderRadius: '0.75em',
            cursor: 'default',
        },
    },
}
