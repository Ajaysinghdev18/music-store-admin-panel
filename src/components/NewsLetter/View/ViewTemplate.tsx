// Dependencies
import React, { useEffect, useRef, useState } from 'react';
import EmailEditor from 'react-email-editor';
import { useNavigate } from 'react-router-dom';

import { EmailApi, NewsLetterApi } from '../../../apis';
import { ROUTES } from '../../../constants';
import Header from '../Common/Header';
import { TEMPLATE_TYPE } from '../Common/MoreActionMenu';
import { Container, Content } from './styles';

// Components

export const ViewNewsLetter = (id: any) => {
  const [template, setTemplate] = useState();
  const [templateName, setTemplateName] = useState('');
  const navigate = useNavigate();
  const emailEditorRef = useRef(null);
  useEffect(() => {
    NewsLetterApi.getNewsLetterById(id.id)
      .then((res) => {
        setTemplate(res.templates);
        setTemplateName(res.templates.title);
      })
      .catch((e) => console.log(e));
  }, []);

  const onReady = () => {
    //@ts-ignore
    emailEditorRef.current?.editor?.loadDesign(JSON.parse(template.contentJSON));
  };
  const handleSubmit = (values, type) => {
    try {
      //@ts-ignore
      emailEditorRef.current.editor.exportHtml(async (data) => {
        const { design, html } = data;
        const tempVal = {
          title: templateName ? templateName : 'New Template',
          description: values.description,
          subject: values.subject,
          thumbnail: values.thumbnail,
          contentHtml: html,
          template_type: type,
          email_type: 'none'
        };
        const json = JSON.stringify(design);
        const templateParams = new FormData();
        Object.entries(tempVal).forEach(([key, value]) => {
          templateParams.append(key, value);
        });
        templateParams.append('contentJSON', json);
        const response = await NewsLetterApi.updateNewsLettereById(id.id, templateParams);
        if (response) {
          navigate(ROUTES.EMAIL.LIST);
        }
      });
    } catch (e) {
      console.log('error', e);
    }
  };


  return (
    <Container>
      <Content>
        <Header
          type={'edit'}
          setTemplateName={setTemplateName}
          templateName={templateName}
          template={template}
          isCollapsed={true}
          handleSaveAsDraft={(values) => handleSubmit(values, TEMPLATE_TYPE.DRAFT)}
          handleSaveAsSubmit={(values) => handleSubmit(values, TEMPLATE_TYPE.PUBLISHED)}
        />
        <EmailEditor ref={emailEditorRef} onReady={onReady} />
      </Content>
    </Container>
  );
};
