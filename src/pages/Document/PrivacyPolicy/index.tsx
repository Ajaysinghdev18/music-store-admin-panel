import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { PrivacyApi } from '../../../apis';
import { IPrivacy } from '../../../shared/types';
import { setSearchExp } from '../../../store/actions/header.actions';
import * as S from './styles';

export const PrivacyPolicyPage: FC = () => {
  const [privacyData, setPrivacyData] = useState<IPrivacy>();
  const dispatch = useDispatch();

  const handleSave = () => {
    if (privacyData) {
      PrivacyApi.update(privacyData)
        .then((res) => {
          console.log('req', res.body);
          setPrivacyData(res.body);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Fetch data
  const fetchData = () => {
    PrivacyApi.read()
      .then((res) => {
        setPrivacyData(res.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // On mounted
  useEffect(() => {
    fetchData();
    dispatch(setSearchExp(''));
  }, []);

  return (
    <Card>
      <S.Header>
        <TextField
          name="title"
          sx={(theme) => ({
            width: '100%',
            '& fieldset': {
              border: 'none'
            },
            input: {
              color: theme.palette.text.primary,
              fontSize: 24,
              padding: '0 !important'
            }
          })}
          value={privacyData?.title}
          onChange={(e) =>
            setPrivacyData({
              content: privacyData?.content,
              title: e.target.value
            })
          }
        />

        <Typography variant="overline" color="text.disabled" sx={{ flexShrink: 0 }}>
          Updated: {moment(privacyData?.updatedAt).format('HH:MM - MMMM DD,  YYYY')}
        </Typography>
      </S.Header>
      <CardContent>
        <TextField
          fullWidth
          multiline
          minRows={12}
          name="description"
          label=""
          value={privacyData?.content}
          onChange={(e) =>
            setPrivacyData({
              title: privacyData?.title,
              content: e.target.value
            })
          }
          sx={(theme) => ({
            '& fieldset': {
              border: 'none'
            },
            '& textarea': {
              color: theme.palette.text.primary,
              fontSize: 20,
              padding: '0 !important'
            }
          })}
        />
      </CardContent>
      {/*<S.Content>*/}
      {/*  {privacyData?.content}*/}
      {/*  /!*Privacy (UK: , US: ) is the ability of an individual or group to seclude themselves or information about*!/*/}
      {/*  /!*themselves, and thereby express themselves selectively. When something is private to a person, it usually means*!/*/}
      {/*  /!*that something is inherently special or sensitive to them. The domain of privacy partially overlaps with*!/*/}
      {/*  /!*security, which can include the concepts of appropriate use and protection of information. Privacy may also take*!/*/}
      {/*  /!*the form of bodily integrity. The right not to be subjected to unsanctioned invasions of privacy by the*!/*/}
      {/*  /!*government, corporations, or individuals is part of many countries' privacy laws, and in some cases,*!/*/}
      {/*  /!*constitutions.*!/*/}
      {/*  /!*<br />*!/*/}
      {/*  /!*<br />*!/*/}
      {/*  /!*The concept of universal individual privacy is a modern concept primarily associated with Western culture,*!/*/}
      {/*  /!*particularly British and North American, and remained virtually unknown in some cultures until recent times.*!/*/}
      {/*  /!*Now, most cultures recognize the ability of individuals to withhold certain parts of personal information from*!/*/}
      {/*  /!*wider society. With the rise of technology, the debate regarding privacy has shifted from a bodily sense to a*!/*/}
      {/*  /!*digital sense. As the world has become digital, there have been conflicts regarding the legal right to privacy*!/*/}
      {/*  /!*and where it is applicable. In most countries, the right to a reasonable expectation to digital privacy has been*!/*/}
      {/*  /!*extended from the original right to privacy, and many countries, notably the US, under its agency, the Federal*!/*/}
      {/*  /!*Trade Commission, and those within the European Union (EU), have passed acts that further protect digital*!/*/}
      {/*  /!*privacy from public and private entities and grant additional rights to users of technology. With the rise of*!/*/}
      {/*  /!*the Internet, there has been an increase in the prevalence of social bots, causing political polarization and*!/*/}
      {/*  /!*harassment. Online harassment has also spiked, particularly with teenagers, which has consequently resulted in*!/*/}
      {/*  /!*multiple privacy breaches. Selfie culture, the prominence of networks like Facebook and Instagram, location*!/*/}
      {/*  /!*technology, and the use of advertisements and their tracking methods also pose threats to digital privacy.*!/*/}
      {/*  /!*<br />*!/*/}
      {/*  /!*<br />*!/*/}
      {/*  /!*Through the rise of technology and immensity of the debate regarding privacy, there have been various*!/*/}
      {/*  /!*conceptions of privacy, which include the right to be let alone as defined in "The Right to Privacy", the first*!/*/}
      {/*  /!*U.S. publication discussing privacy as a legal right, to the theory of the privacy paradox, which describes the*!/*/}
      {/*  /!*notion that users' online may say they are concerned about their privacy, but in reality, are not. Along with*!/*/}
      {/*  /!*various understandings of privacy, there are actions that reduce privacy, the most recent classification*!/*/}
      {/*  /!*includes processing of information, sharing information, and invading personal space to get private information,*!/*/}
      {/*  /!*as defined by Daniel J. Solove. Conversely, in order to protect a users's privacy, multiple steps can be taken,*!/*/}
      {/*  /!*specifically through practicing encryption, anonymity, and taking further measures to bolster the security of*!/*/}
      {/*  /!*their data.*!/*/}
      {/*  /!*<br />*!/*/}
      {/*  /!*<br />*!/*/}
      {/*  /!*Privacy (UK: , US: ) is the ability of an individual or group to seclude themselves or information about*!/*/}
      {/*  /!*themselves, and thereby express themselves selectively. When something is private to a person, it usually means*!/*/}
      {/*  /!*that something is inherently special or sensitive to them. The domain of privacy partially overlaps with*!/*/}
      {/*  /!*security, which can include the concepts of appropriate use and protection of information. Privacy may also take*!/*/}
      {/*  /!*the form of bodily integrity. The right not to be subjected to unsanctioned invasions of privacy by the*!/*/}
      {/*  /!*government, corporations, or individuals is part of many countries' privacy laws, and in some cases,*!/*/}
      {/*  /!*constitutions.*!/*/}
      {/*  /!*<br />*!/*/}
      {/*  /!*<br />*!/*/}
      {/*  /!*The concept of universal individual privacy is a modern concept primarily associated with Western culture,*!/*/}
      {/*  /!*particularly British and North American, and remained virtually unknown in some cultures until recent times.*!/*/}
      {/*  /!*Now, most cultures recognize the ability of individuals to withhold certain parts of personal information from*!/*/}
      {/*  /!*wider society. With the rise of technology, the debate regarding privacy has shifted from a bodily sense to a*!/*/}
      {/*  /!*digital sense. As the world has become digital, there have been conflicts regarding the legal right to privacy*!/*/}
      {/*  /!*and where it is applicable. In most countries, the right to a reasonable expectation to digital privacy has been*!/*/}
      {/*  /!*extended from the original right to privacy, and many countries, notably the US, under its agency, the Federal*!/*/}
      {/*  /!*Trade Commission, and those within the European Union (EU), have passed acts that further protect digital*!/*/}
      {/*  /!*privacy from public and private entities and grant additional rights to users of technology. With the rise of*!/*/}
      {/*  /!*the Internet, there has been an increase in the prevalence of social bots, causing political polarization and*!/*/}
      {/*  /!*harassment. Online harassment has also spiked, particularly with teenagers, which has consequently resulted in*!/*/}
      {/*  /!*multiple privacy breaches. Selfie culture, the prominence of networks like Facebook and Instagram, location*!/*/}
      {/*  /!*technology, and the use of advertisements and their tracking methods also pose threats to digital privacy.*!/*/}
      {/*  /!*<br />*!/*/}
      {/*  /!*<br />*!/*/}
      {/*  /!*Through the rise of technology and immensity of the debate regarding privacy, there have been various*!/*/}
      {/*  /!*conceptions of privacy, which include the right to be let alone as defined in "The Right to Privacy", the first*!/*/}
      {/*  /!*U.S. publication discussing privacy as a legal right, to the theory of the privacy paradox, which describes the*!/*/}
      {/*  /!*notion that users' online may say they are concerned about their privacy, but in reality, are not. Along with*!/*/}
      {/*  /!*various understandings of privacy, there are actions that reduce privacy, the most recent classification*!/*/}
      {/*  /!*includes processing of information, sharing information, and invading personal space to get private information,*!/*/}
      {/*  /!*as defined by Daniel J. Solove. Conversely, in order to protect a users's privacy, multiple steps can be taken,*!/*/}
      {/*  /!*specifically through practicing encryption, anonymity, and taking further measures to bolster the security of*!/*/}
      {/*  /!*their data.*!/*/}
      {/*</S.Content>*/}
      <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2}>
        <Stack direction="row" spacing={1}>
          <S.SaveButton variant="contained" onClick={handleSave}>
            Save
          </S.SaveButton>
        </Stack>
      </Box>
    </Card>
  );
};
