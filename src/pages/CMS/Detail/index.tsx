import React from 'react';
import { MyGrapesJSEditor } from '../../../components/CMS/View';
import { useParams } from 'react-router-dom';



export const CMSDetailTemplate = () => {
    const routes = useParams();
    return <MyGrapesJSEditor id={routes.id} />;
};
