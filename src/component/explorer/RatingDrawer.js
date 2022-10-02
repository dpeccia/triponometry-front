import {Button, Flex, Input, ModalOverlay, useDisclosure} from "@chakra-ui/react";
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import {useState} from "react";
import {BiCommentDetail} from "react-icons/bi";
import {RatingCard} from "./RatingCard";
import {RatingSummary} from "./RatingSummary";

export const RatingDrawer = (props) => {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(5px)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)

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
            <Button rightIcon={<BiCommentDetail />} variant='solid' alignSelf='flex-end' ml={2}
                    onClick={() => {
                        setOverlay(<OverlayOne />)
                        onOpen()
                    }}>
                Ver opiniones
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                size='sm'
            >
                {overlay}
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>Opiniones</DrawerHeader>
                    <DrawerBody>
                        <RatingSummary reviews={props.reviews} averageRating={props.averageRating}/>
                        <Flex direction='column'>
                            {ratingCards}
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}