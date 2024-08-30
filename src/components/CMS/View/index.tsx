
import React, { useEffect, useRef, useState } from 'react';
import GjsEditor from '@grapesjs/react';
import { Container, Body } from './style';
import { CMSApi } from '../../../apis';
import { CMSHeader } from '../Header';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants';
const demo = {
    // Your JSON content goes here
    components: [
        {
            type: 'text',
            content: 'Hello, world!',
        },
        {
            type: 'div',
            components: [
                {
                    type: 'text',
                    content: 'This is a nested element.',
                },
            ],
        },
    ],
};
export const MyGrapesJSEditor = ({ id }) => {
    const [templateName, setTemplateName] = React.useState('');
    const [initialContent, setInitialContent] = useState(demo);
    const [initialStyleContent, setInitialStyleContent] = useState<any>();
    const [editor, setEditor] = useState<any>(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        CMSApi.getAllCMSTemplateById(id).then(res => {
            setTemplateName(res.templates?.title);
            const formattedContentJSON = { components: JSON.parse(res.templates?.contentJSON) };
            setInitialStyleContent(res.templates.cssContent);
            setInitialContent(formattedContentJSON);
        });
    }, []);

    useEffect(() => {
        if (editor) {
            // Load the HTML content into the editor
            editor.setComponents(initialContent);
            // Apply the initial style content
            editor.setStyle(initialStyleContent);
            // Set the content as selected to enable editing
            editor.select(editor.getWrapper());
        }
    }, [initialContent, editor]);
    const onSave = async (type) => {
        if (editor) {
            const html = editor.getHtml();
            const json = editor.getComponents();
            const cssContent = editor.getCss();
            const style = editor.getStyle();
            const tempVal = {
                template_type: type,
                title: templateName,
                contentHtml: html,
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
            const response = await CMSApi.updateCMSTemplateById(id, templateParams);
            if (response) {
                navigate(ROUTES.CMS.LIST);
            }
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

