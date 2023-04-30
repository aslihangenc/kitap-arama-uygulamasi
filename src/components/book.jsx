import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

const Book = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Card>
        <CardBody>
          <Image
            w="100%"
            src={
              data.volumeInfo.imageLinks?.thumbnail ||
              '/assets/images/placeholder.jpg'
            }
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md" noOfLines={1}>
              {data.volumeInfo.title}
            </Heading>
          </Stack>
          <Text fontSize="sm">
            {data.volumeInfo.authors?.join(', ') || 'No author available'}
          </Text>
        </CardBody>
        <CardFooter>
          <ButtonGroup w="100%" justifyContent="end">
            <Link href={data.volumeInfo.previewLink} isExternal>
              <Button colorScheme="blue" size="sm">
                Önizleme
              </Button>
            </Link>
            <Button onClick={onOpen} colorScheme="green" size="sm">
              Detay
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{data.volumeInfo.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              w="100%"
              src={
                data.volumeInfo.imageLinks?.thumbnail ||
                '/assets/images/placeholder.jpg'
              }
              borderRadius="lg"
            />

            <Stack mt="6" spacing="3">
              <Text fontSize="sm">
                {data.volumeInfo.authors?.join(', ') || 'No author available'}
              </Text>
              <Text fontSize="sm">
                {data.volumeInfo.publisher || 'No publisher available'}
              </Text>
              <Text fontSize="sm">
                {data.volumeInfo.publishedDate || 'No published date available'}
              </Text>
              <Text fontSize="sm">
                {data.volumeInfo.description || 'No description available'}
              </Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Kapat
            </Button>
            <Link href={data.volumeInfo.previewLink} isExternal>
              <Button colorScheme="linkedin">
                Önizleme
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Book;
