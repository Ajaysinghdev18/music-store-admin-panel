import { Box, IconButton, Stack } from '@mui/material';
import React, { useState } from 'react';
import { DeleteIcon, PlusIcon } from '../../assets/icons';
import { TextInput } from '../TextInput';

export const FeatureField = ({ fieldsArray, setFieldsArray }) => {

    const handleAddFeatures = () => {
        const temparr: any = { name: 'Key', value: 'Value', type: 'single' };
        setFieldsArray([...fieldsArray, temparr]);
    };

    const handleNameChange = (e: any, index) => {
        const updatedArray: any = [...fieldsArray];
        updatedArray[index].name = e.target.value;
        setFieldsArray(updatedArray);
    };

    const handleValueChange = (e: any, index) => {
        const updatedArray: any = [...fieldsArray];
        updatedArray[index].value = e.target.value;
        setFieldsArray(updatedArray);
    };
    const handleRemoveFeature = (index) => {
        const updatedArray = [...fieldsArray];
        updatedArray.splice(index, 1);
        setFieldsArray(updatedArray);
    };
    return (
        <>
            {fieldsArray.length > 0 && fieldsArray.map((item, index) => (
                item.type === 'single' && <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mt={10} mb={10} flexDirection={'row'} key={index}>
                    <Stack >
                        <TextInput
                            label="Key"
                            value={item.name} onChange={(e) => handleNameChange(e, index)}
                        />
                    </Stack>
                    <Stack>
                        <TextInput
                            label="Value"
                            value={item.value} onChange={(e) => handleValueChange(e, index)}
                        />

                    </Stack>
                    <IconButton onClick={() => handleRemoveFeature(index)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}
            <Box display={'flex'} mt={15} mb={20} alignItems={'center'} gap={12} onClick={() => handleAddFeatures()}>
                <PlusIcon />
                <Box fontWeight={'500'} fontSize={'0.875rem'}>
                    New Single Field Feature
                </Box>
            </Box>
        </>
    );
};

export const MultipleFeatureField = ({ multiFieldsArray, setMultiFieldsArray }) => {

    const handleAddFeatures = () => {
        const temparr: any = { name: 'Key', value: ['Value'], type: 'multiple' };
        setMultiFieldsArray([...multiFieldsArray, temparr]);
    };

    const handleNameChange = (e: any, index) => {
        const updatedArray: any = [...multiFieldsArray];
        updatedArray[index].name = e.target.value;
        setMultiFieldsArray(updatedArray);
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, featureIndex: number, valueIndex: number) => {
        const updatedArray: any = [...multiFieldsArray];
        updatedArray[featureIndex].value[valueIndex] = e.target.value;
        setMultiFieldsArray(updatedArray);
    };

    const handleRemoveFeature = (index) => {
        const updatedArray = [...multiFieldsArray];
        updatedArray.splice(index, 1);
        setMultiFieldsArray(updatedArray);
    };
    const handleRemoveOption = (featureIndex: number, valueIndex: number) => {
        const updatedArray = [...multiFieldsArray];
        if (updatedArray[featureIndex].value.length > 1) {
            // Ensure there is at least one option for each feature
            updatedArray[featureIndex].value.splice(valueIndex, 1);
            setMultiFieldsArray(updatedArray);
        }
    };
    const handleAddOption = (featureIndex: number) => {
        const updatedArray: any = [...multiFieldsArray];
        updatedArray[featureIndex].value.push('New Value');
        setMultiFieldsArray(updatedArray);
    };


    return (
        <>
            {multiFieldsArray.length > 0 && multiFieldsArray.map((item, index) => (
                item.type === 'multiple' &&
                <Box  display={'flex'} justifyContent={'space-between'} alignItems={'start'} mt={10} mb={10} flexDirection={'row'} key={index}>
                    <Stack justifyContent={'start'}>
                        <Box marginBottom={10} display={'flex'} fontWeight={'500'} alignItems={'center'} fontSize={'0.875rem'}>
                            Key
                        </Box>
                        <TextInput value={item.name} onChange={(e) => handleNameChange(e, index)} />
                    </Stack>
                    <Stack>
                        <Box  marginBottom={10}  display={'flex'} fontWeight={'500'} alignItems={'center'} fontSize={'0.875rem'}>
                            Option
                            <PlusIcon fontSize={10} onClick={() => handleAddOption(index)} />
                        </Box>
                        {item?.value?.map((value, valueIndex) => {
                            return (
                                <Stack display={'flex'} mb={10} justifyContent={'center'} alignItems={'center'} flexDirection={'row'} key={valueIndex}>
                                    <TextInput
                                        value={value} onChange={(e) => handleValueChange(e, index, valueIndex)}

                                    />
                                    <IconButton onClick={() => handleRemoveOption(index, valueIndex)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>

                            );
                        })}
                    </Stack>

                    <IconButton onClick={() => handleRemoveFeature(index)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}
            <Box display={'flex'} mt={15} alignItems={'center'} gap={12} onClick={() => handleAddFeatures()}>
                <PlusIcon />
                <Box fontWeight={'500'} fontSize={'0.875rem'}>
                    New Multiple Field Feature
                </Box>
            </Box>
        </>
    );
};
