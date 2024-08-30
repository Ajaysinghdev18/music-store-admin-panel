// theme, If you need to change the theme, you can make a duplicate in https://arco.design/themes/design/1799/setting/base/Color
import '@arco-themes/react-easy-email-theme/css/arco.css';
import { AdvancedType, BasicType, BlockManager, JsonToMjml } from 'easy-email-core';
import { EmailEditor, EmailEditorProvider, EmailEditorProviderProps } from 'easy-email-editor';
import 'easy-email-editor/lib/style.css';
import { ExtensionProps, StandardLayout } from 'easy-email-extensions';
import 'easy-email-extensions/lib/style.css';
import { Liquid } from 'liquidjs';
import mjml from 'mjml-browser';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from 'react-use';

import { EmailApi } from '../../../../apis';
import Header from '../../../../components/Email/Common/Header';
import { TEMPLATE_TYPE } from '../../../../components/Email/Common/MoreActionMenu';
import { ROUTES } from '../../../../constants';

const imageCompression = import('browser-image-compression');
const initialValues = {
  subject: 'Welcome to Easy-email',
  subTitle: 'Nice to meet you!',
  content: BlockManager.getBlockByType(BasicType.PAGE)!.create({})
};

const defaultCategories: ExtensionProps['categories'] = [
  {
    label: 'Content',
    active: true,
    blocks: [
      {
        type: AdvancedType.TEXT
      },
      {
        type: AdvancedType.IMAGE,
        payload: { attributes: { padding: '0px 0px 0px 0px' } }
      },
      {
        type: AdvancedType.BUTTON
      },
      {
        type: AdvancedType.SOCIAL
      },
      {
        type: AdvancedType.DIVIDER
      },
      {
        type: AdvancedType.SPACER
      },
      {
        type: AdvancedType.HERO
      },
      {
        type: AdvancedType.WRAPPER
      }
    ]
  },
  {
    label: 'Layout',
    active: true,
    displayType: 'column',
    blocks: [
      {
        title: '2 columns',
        payload: [
          ['50%', '50%'],
          ['33%', '67%'],
          ['67%', '33%'],
          ['25%', '75%'],
          ['75%', '25%']
        ]
      },
      {
        title: '3 columns',
        payload: [
          ['33.33%', '33.33%', '33.33%'],
          ['25%', '25%', '50%'],
          ['50%', '25%', '25%']
        ]
      },
      {
        title: '4 columns',
        payload: [['25%', '25%', '25%', '25%']]
      }
    ]
  }
];

export default function EasyMailViewTemplate(id: any) {
  const { width } = useWindowSize();
  const [templateName, setTemplateName] = useState();
  const [templateData, setTemplateData] = useState();
  const [template, setTemplate] = useState<any>();
  const navigate = useNavigate();
  useEffect(() => {
    EmailApi.getAllEmailTemplateById(id.id)
      .then((res) => {
        setTemplateData(res.templates);
        setTemplate({
          subject: res.templates.subject,
          subTitle: res.templates.description,
          content: JSON.parse(res.templates.contentJSON)
        });
        setTemplateName(res.templates.title);
      })
      .catch((e) => console.log(e));
  }, []);

  const smallScene = width < 1400;

  const onUploadImage = async (blob: Blob) => {
    const compressionFile = await (
      await imageCompression
    ).default(blob as File, {
      maxWidthOrHeight: 1440
    });
    const data = new FormData();
    data.append('image', compressionFile);
    const res = await EmailApi.uploadImage(data);
    return res.url;
  };

  const onBeforePreview: EmailEditorProviderProps['onBeforePreview'] = useCallback((html: string, mergeTags) => {
    const engine = new Liquid();
    const tpl = engine.parse(html);
    return engine.renderSync(tpl, mergeTags);
  }, []);
  const handleSendEmail = async (values, content) => {
    const mjmlString = JsonToMjml({
      data: content.content,
      mode: 'production',
      context: content.content
    });
    const html = mjml(mjmlString, {}).html;
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
  };
  const handleSubmit = async (values, type, content) => {
    try {
      const mjmlString = JsonToMjml({
        data: content.content,
        mode: 'production',
        context: content.content
      });
      const html = mjml(mjmlString, {}).html;
      const json = JSON.stringify(content.content);
      const templateParams = new FormData();
      const tempVal = {
        title: templateName ? templateName : 'New Template',
        description: values.description,
        thumbnail: values.thumbnail,
        subject: values.subject,
        contentHtml: html,
        template_type: type
      };
      Object.entries(tempVal).forEach(([key, value]) => {
        templateParams.append(key, value);
      });
      templateParams.append('contentJSON', json);
      const response = await EmailApi.updateEmailTemplateById(id.id, templateParams);
      if (response) {
        navigate(ROUTES.EMAIL.LIST);
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <EmailEditorProvider
      data={template ? template : initialValues}
      height={'calc(100vh - 72px)'}
      autoComplete
      onUploadImage={onUploadImage}
      dashed={false}
      enabledLogic
      mergeTagGenerate={(tag) => `{{${tag}}}`}
      onBeforePreview={onBeforePreview}
    >
      {({ values }) => {
        return (
          <>
            <Header
              type={'edit'}
              setTemplateName={setTemplateName}
              templateName={templateName}
              handleSendEmail={(val) => handleSendEmail(val, values)}
              isCollapsed={true}
              template={templateData}
              handleSaveAsDraft={(val) => handleSubmit(val, TEMPLATE_TYPE.DRAFT, values)}
              handleSaveAsSubmit={(val) => handleSubmit(val, TEMPLATE_TYPE.PUBLISH, values)}
            />
            <StandardLayout compact={!smallScene} showSourceCode={true} categories={defaultCategories}>
              <EmailEditor />
            </StandardLayout>
          </>
        );
      }}
    </EmailEditorProvider>
  );
}
