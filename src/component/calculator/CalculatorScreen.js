import { Box } from "@chakra-ui/react";
import {ScrollingBox} from "../utils/ScrollingBox";

export const CalculatorScreen = (props) => {
    return (
        <Box bg='#DDEF8D' w='350px' h='250px' marginBottom='6' p='3' borderTopRadius='30' borderBottomRadius='15' boxShadow='inner'>
            <ScrollingBox>
                {props.children}
            </ScrollingBox>
        </Box>
    );
}