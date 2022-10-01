import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import {
  FormLabel,
  FormControl,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  FormErrorMessage
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

interface Data {
  title: string;
  value: any;
}

interface SelectProps extends ChakraSelectProps {
  name: string;
  label?: string;
  error?: FieldError;
  data: Data[];
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> =
  ({ name, error = null, label, data, ...rest }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        {!!label && <FormLabel htmlFor='name'>{label}</FormLabel>}
        <ChakraSelect
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
        >
          {data.map(d => (
            <option value={d.value} >{d.title}</option>
          ))}
        </ChakraSelect>
        {!!error && (
          <FormErrorMessage>
            {error.message}
          </FormErrorMessage>
        )}
      </FormControl>
    )
  }

export const Select = forwardRef(SelectBase);