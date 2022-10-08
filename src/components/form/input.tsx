import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react';
import InputMask from "react-input-mask"
import {
  FormLabel,
  FormControl,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormErrorMessage,
  InputGroup
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
  mask?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> =
  ({ name, error = null, label, mask, leftElement, rightElement, ...rest }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        {!!label && <FormLabel htmlFor="name">{label}</FormLabel>}
        <InputGroup>
          {leftElement}
          <ChakraInput
            // @ts-ignore:next-line
            as={mask ? InputMask : null}
            mask={mask}
            maskChar={null}
            name={name}
            id={name}
            focusBorderColor="orange.400"
            bgColor="blackAlpha.100"
            variant="filled"
            _hover={{
              bgColor: 'blackAlpha.200'
            }}
            size="lg"
            ref={ref}
            {...rest}    
          />
          {rightElement}
        </InputGroup>
        {!!error && (
          <FormErrorMessage>
            {error.message}
          </FormErrorMessage>
        )}
      </FormControl>
    )
  }

export const Input = forwardRef(InputBase);