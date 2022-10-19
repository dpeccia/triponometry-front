import { Badge } from "@chakra-ui/layout";
import {Link} from "@chakra-ui/react"
import { keyframes } from "@chakra-ui/system";

const glowing = keyframes`
    0% { box-shadow: 0 0 -10px #6c00c4; }
    40% { box-shadow: 0 0 20px #6c00c4; }
    60% { box-shadow: 0 0 20px #6c00c4; }
    100% { box-shadow: 0 0 -10px #6c00c4; }
`;

export const PlantillaBadge = ({ justify, align, original }) => {
    const animation = `${glowing} 1500ms infinite`;
    return (
        <Badge borderRadius='full' variant='outline' py='2' px='6' fontSize='md' colorScheme='purple' justifySelf={justify} alignSelf={align} animation={animation} >
            Estás usando {<Link href={original.link} isExternal color='purple.700' fontWeight='bold'> ESTE CÁLCULO</Link>} como plantilla
        </Badge>
    )
}