import moment from 'moment';
import React from 'react';

import { ITemplate, iconBase64 } from './template1';

export default function Template3(props: ITemplate) {
  const { name, startTime, endTime, location, base64, height, width } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Template3"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      viewBox="0 0 1690 420.006"
    >
      <defs>
        <clipPath id="clip-path">
          <rect
            id="Rectangle_1864"
            data-name="Rectangle 1864"
            width="324.104"
            height="420.005"
            transform="translate(1022 410)"
            fill="#fff"
            stroke="#707070"
            stroke-width="1"
          />
        </clipPath>
      </defs>

      <g id="Group_1086" data-name="Group 1086" transform="translate(-114.998 -329.996)">
        {/*<rect id="Rectangle_1883" data-name="Rectangle 1883" width="1690" height="420" transform="translate(114.998 330.002)" fill="#e6e6e6"/>*/}
        {/*<g id="Mask_Group_36" data-name="Mask Group 36" clip-path="url(#clip-path)">*/}
        <image
          id="https-__cdn.evbuc.com_images_226136489_249360561197_1_original"
          transform="translate(90 340)"
          width="900"
          height="100%"
          xlinkHref={base64 ? base64 : iconBase64}
        />
        {/*</g>*/}
        <text
          id="Music_on_Rhoon_Festival"
          data-name="Music on Rhoon
Festival"
          transform="translate(967 366)"
          font-size="65"
          font-family="BasementGrotesque-Black, Basement Grotesque"
          font-weight="800"
        >
          <tspan x="0" y="52">
            {name ? name : 'Event Title here'}
          </tspan>
        </text>
        <text
          id="Saturday_June_25_2022_14:30_to_01:00_CEST_"
          data-name="Saturday

June 25 2022

14:30 to 01:00 (CEST)"
          transform="translate(1000 618.002)"
          font-size="16"
          font-family="PressStart2P-Regular, 'Press Start \32 P'"
        >
          <tspan x="0" y="16">
            {moment(startTime).format('dddd')}
          </tspan>
          <tspan x="0" y="36"></tspan>
          <tspan x="0" y="56">
            {moment(startTime).format('DD MMMM')}
          </tspan>
          <tspan x="0" y="76"></tspan>
          <tspan x="0" y="96">
            {moment(startTime).format('h:m a')} to {moment(endTime).format('h:m a')}
          </tspan>
        </text>
        <text
          id="Music_s_Clubhouse_Metaverse"
          data-name="Music's Clubhouse

Metaverse"
          transform="translate(1827 366)"
          font-size="16"
          font-family="PressStart2P-Regular, 'Press Start \32 P'"
        >
          <tspan x="-304" y="16">
            {location ? location : 'Event Location here'}
          </tspan>
          <tspan x="0" y="36"></tspan>
        </text>
        <path
          id="Union_1"
          data-name="Union 1"
          d="M0,76V15H5V10h5v5H61V76Zm56-5V20H5V71Zm5,0V66h5v5Zm5-5V61h5v5Zm153-4V57h14v5Zm-38,0V57h23v5Zm-27,0V57h-5V52h5v5h13v5Zm-33,0V57h13v5Zm-19,0V34H98V29h9V62Zm-9,0V34H89V62H84V29h9v5h5V62ZM23,62V57H37v5Zm-5,0V29h5V62Zm53-1V10H66V5H15V0H76V61Zm162-4V52h5v5Zm-19,0V34h5V57Zm-24,0V34h-9V29h23v5h-9V57Zm-23,0V48H154V43h13v5h5v9Zm-33,0V29h5V57Zm-18,0V29h5V57ZM37,57V34H23V29H37v5h5V57ZM149,43V34h5v9Zm84-4V34h5v5Zm-66,0V34h5v5Zm52-5V29h14v5Zm-65,0V29h13v5ZM61,15V10h5v5ZM10,10V5h5v5Z"
          transform="translate(1725 476) rotate(90)"
          style={{ mixBlendMode: 'overlay', isolation: 'isolate' }}
        />
      </g>
    </svg>
  );
}
