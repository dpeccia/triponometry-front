import { Badge } from "@chakra-ui/layout";
import { keyframes } from "@chakra-ui/system";

const glowing = keyframes`
    0% { box-shadow: 0 0 -10px #c4a300; }
    40% { box-shadow: 0 0 20px #c4a300; }
    60% { box-shadow: 0 0 20px #c4a300; }
    100% { box-shadow: 0 0 -10px #c4a300; }
`;

export const EditBadge = ({ justify, align }) => {
    const animation = `${glowing} 1500ms infinite`;
    return (
        <Badge borderRadius='full' variant='outline' py='2' px='6' fontSize='md' colorScheme='orange' justifySelf={justify} alignSelf={align} animation={animation} >
            Estás editando
        </Badge>
    )
}