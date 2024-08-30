// Dependencies
import { useRef, useState } from 'react';
import EmailEditor from 'react-email-editor';
import { useNavigate } from 'react-router-dom';

import { EmailApi } from '../../../apis';
import { ROUTES } from '../../../constants';
import Header from '../Common/Header';
import { TEMPLATE_TYPE } from '../Common/MoreActionMenu';
import { Body, Container } from './styles';

export const NewsLetterNew = () => {
  const [templateName, setTemplateName] = useState();
  const navigate = useNavigate();
  const emailEditorRef = useRef(null);

  const handleSubmit = (values, type) => {
    try {
      //@ts-ignore
      emailEditorRef.current.editor.exportHtml(async (data) => {
        const { design, html } = data;
        const tempVal = {
          title: templateName ? templateName : 'New Template',
          description: values.description,
          thumbnail: values.thumbnail,
          subject: values.subject,
          contentHtml: html,
          template_type: type
        };
        const json = JSON.stringify(design);
        const templateParams = new FormData();
        Object.entries(tempVal).forEach(([key, value]) => {
          templateParams.append(key, value);
        });
        templateParams.append('contentJSON', json);
        const response = await EmailApi.createEmailTemplate(templateParams);
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
      <Header
        type={'new'}
        setTemplateName={setTemplateName}
        templateName={templateName}
        isCollapsed={true}
        handleSaveAsDraft={(values) => handleSubmit(values, TEMPLATE_TYPE.DRAFT)}
        handleSaveAsSubmit={(values) => handleSubmit(values, TEMPLATE_TYPE.PUBLISHED)}
      />
      <Body>
        <EmailEditor ref={emailEditorRef} />
      </Body>
    </Container>
  );
};
