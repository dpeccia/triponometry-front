import { Box } from "@chakra-ui/react";

export const CalculatorScreen = (props) => {
    return (
        <Box bg='#DDEF8D' w='350px' h='250px' marginBottom='6' p='3' borderTopRadius='30' borderBottomRadius='15' boxShadow='inner'>
            <Box h='100%' overflowY='auto'
                css={{
                    '&::-webkit-scrollbar': { width: '6px' },
                    '&::-webkit-scrollbar-track': { width: '6px' },
                    '&::-webkit-scrollbar-thumb': { background: '#A0AEC0', borderRadius: '24px' }
                }}>
                {props.children}
            </Box>
        </Box>
    );
}