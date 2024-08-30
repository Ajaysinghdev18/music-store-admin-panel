
import React, { useEffect, useRef, useState } from 'react';
import GjsEditor from '@grapesjs/react';
import { Container, Body } from './style';
import { CMSApi } from '../../../apis';
import { CMSHeader } from '../Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants';
export const ExistingTemplateEditor = () => {
    const [templateName, setTemplateName] = React.useState('');
    const navigate = useNavigate();
    const [editor, setEditor] = useState<any>(null);
    const { state } = useLocation();

    useEffect(() => {
        if (editor) {
            const formattedJSON = { components: JSON.parse(state.item.contentJSON) };
            // Load the HTML content into the editor
            editor.setComponents(formattedJSON);
            editor.setStyle(state.item.cssContent);
            // editor.setComponents(state.item.htmlJSON);

            // Set the content as selected to enable editing
            editor.select(editor.getWrapper());
        }
    }, [state.item.contentJSON, editor]);
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
                    template_type: type,
                    cssContent: cssContent,
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
                if (response) {
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

