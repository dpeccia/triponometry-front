import { Tag, TagLabel } from "@chakra-ui/react";

export const ItemCard = (props) => {
    if(props.children) return (
        <Tag borderRadius='full' m={1} bg='white' size='lg' boxShadow='lg'>
            <TagLabel>{props.children}</TagLabel>
        </Tag>
    )
}

export const MealCard = (props) => {
    if(props.meal) return (
        <ItemCard>{`${props.meal.number}${props.meal.time} para ${props.mealType}`}</ItemCard>
    )
}

export const BedCard = (props) => {
    if(props.bed) return (
        <ItemCard>{`${props.bedType} a las ${props.bed}hs`}</ItemCard>
    )
}

export const FreeDayCard = (props) => {
    if(props.freeDay) return (
        <ItemCard>{`${props.freeDay} dias libres`}</ItemCard>
    )
}