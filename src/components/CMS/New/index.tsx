import React, { useState } from 'react';
import GjsEditor from '@grapesjs/react';
import { Body, Container } from './styles';
import { CMSHeader } from '../Header';
import { CMSApi } from '../../../apis';
import { ROUTES } from '../../../constants';
import { useNavigate } from 'react-router-dom';


export const NewCMSTemplate = () => {
    const [templateName, setTemplateName] = React.useState('');
    const [editor, setEditor] = useState<any>(null);
    const navigate = useNavigate();

    const onSave = async (type) => {
        try {
            if (editor) {
                const html = editor.getHtml();
                const json = editor.getComponents();
                const cssContent = editor.getCss();
                const style = editor.getStyle();
                const tempVal = {
                    id: templateName.replaceAll(' ', '-'),
                    _id: templateName.replaceAll(' ', '-'),
                    title: templateName,
                    contentHtml: html,
                    cssContent: cssContent,
                    template_type: type
                };
                const formattedJson = JSON.stringify(json);
                const formattedStyle = JSON.stringify(style);
                const templateParams = new FormData();
                Object.entries(tempVal).forEach(([key, value]) => {
                    templateParams.append(key, value);
                });
                templateParams.append('contentJSON', formattedJson);
                templateParams.append('styleContent', formattedStyle);
                const response = await CMSApi.createCMSTemplate(templateParams);
                if(response){
                    navigate(ROUTES.CMS.LIST);
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    };
    return (
        <Container>
            <CMSHeader
                setTemplateName={setTemplateName}
                templateName={templateName}
                handleSaveAsDraft={() => onSave('draft')}
                handlePublish={() => onSave('published')}
            />
            <Body>
                <GjsEditor
                    grapesjs="https://unpkg.com/grapesjs"
                    grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
                    options={{
                        height: '100vh',
                        storageManager: false,
                    }}
                    plugins={[
                        {
                            id: 'gjs-blocks-basic',
                            src: 'https://unpkg.com/grapesjs-blocks-basic',
                        },
                    ]}
                    onEditor={(ed) => setEditor(ed)}
                />
            </Body>
        </Container>
    );
};
