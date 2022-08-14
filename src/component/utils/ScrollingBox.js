import {Box} from "@chakra-ui/react";

export const ScrollingBox = (props) => {
    return (
        <Box h='100%' overflowY='auto'
             css={{
                 '&::-webkit-scrollbar': { width: '6px' },
                 '&::-webkit-scrollbar-track': { width: '6px' },
                 '&::-webkit-scrollbar-thumb': { background: '#A0AEC0', borderRadius: '24px' }
             }}>
            {props.children}
        </Box>
    )
}