import {Flex} from "@chakra-ui/react";
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import {RatingCard} from "./RatingCard";
import {RatingSummary} from "./RatingSummary";

export const RatingDrawer = (props) => {

    const ratingCards = props.reviews.map((review) => {
        return(
            <RatingCard
                key={review.id}
                score={review.stars}
                hasDone={review.done}
                review={review.description}
                userId={review.user}
            />
        )
    })

    return (
        <>
            <Drawer
                isOpen={props.isOpen}
                placement='right'
                onClose={props.onClose}
                size='sm'
            >
                {props.overlay}
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>Opiniones</DrawerHeader>
                    <DrawerBody>
                        <RatingSummary reviews={props.reviews} averageRating={props.averageRating}/>
                        <Flex direction='column' gap={1}>
                            {ratingCards}
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}