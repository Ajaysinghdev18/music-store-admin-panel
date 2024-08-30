// Dependencies
import React, { useEffect, useRef, useState } from 'react';
import EmailEditor from 'react-email-editor';
import { useNavigate } from 'react-router-dom';

import { EmailApi } from '../../../apis';
import { ROUTES } from '../../../constants';
import Header from '../Common/Header';
import { TEMPLATE_TYPE } from '../Common/MoreActionMenu';
import { Container, Content } from './styles';

// Components

export const ViewEmailTemplate = (id: any) => {
  const [template, setTemplate] = useState();
  const [templateName, setTemplateName] = useState('');
  const navigate = useNavigate();
  const emailEditorRef = useRef(null);
  useEffect(() => {
    EmailApi.getAllEmailTemplateById(id.id)
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
        const response = await EmailApi.updateEmailTemplateById(id.id, templateParams);
        if (response) {
          navigate(ROUTES.EMAIL.LIST);
        }
      });
    } catch (e) {
      console.log('error', e);
    }
  };

  const handleSendEmail = (values) => {
    //@ts-ignore
    emailEditorRef.current.editor.exportHtml(async (data) => {
      const { html } = data;
      const params = {
        subject: values.subject,
        content: html,
        address: values.to.map((add) => {
          return { address: add };
        })
      };
      await EmailApi.sendEmailToUsers(params).then((res) => {
        if (res) {
          navigate(ROUTES.EMAIL.LIST);
        }
      });
    });
  };

  return (
    <Container>
      <Content>
        <Header
          type={'edit'}
          setTemplateName={setTemplateName}
          templateName={templateName}
          handleSendEmail={(val) => handleSendEmail(val)}
          template={template}
          isCollapsed={true}
          handleSaveAsDraft={(values) => handleSubmit(values, TEMPLATE_TYPE.DRAFT)}
          handleSaveAsSubmit={(values) => handleSubmit(values, TEMPLATE_TYPE.PUBLISH)}
        />
        <EmailEditor ref={emailEditorRef} onReady={onReady} />
      </Content>
    </Container>
  );
};
