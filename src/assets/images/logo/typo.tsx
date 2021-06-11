import React, {memo} from 'react';
import Svg, {Path} from 'react-native-svg';

import {useTheme} from '@hooks/useTheme';

const Typo = (props: any) => {
  const theme = useTheme();

  return (
    <Svg
      width={360}
      height={64}
      viewBox="0 0 360 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M30.582 63.136H16.48a1.18 1.18 0 01-1.094-.749L.076 20.047c-.289-.75.287-1.556 1.093-1.556h12.95c.519 0 .922.346 1.095.807l8.173 25.98c.173.519.921.519 1.094 0l8.288-25.98c.173-.46.576-.806 1.094-.806h11.973c.806 0 1.324.806 1.093 1.555l-15.253 42.34c-.173.46-.576.749-1.094.749zM71.278 63.885c-13.7 0-22.967-9.217-22.967-23.158 0-13.364 9.613-23.042 22.851-23.042 14.39 0 24.176 11.463 22.219 25.692a1.178 1.178 0 01-1.151 1.037H63.737a.577.577 0 00-.575.576c.287 4.781 3.223 7.834 7.77 7.834 3.684 0 6.274-1.44 7.598-4.262.173-.404.576-.634 1.036-.634h11.858c.806 0 1.324.749 1.093 1.498-3.05 9.332-10.706 14.459-21.24 14.459zM51.477 13.883l9.67-11.118c.23-.23.518-.403.863-.403h16.923c.345 0 .633.173.863.403l9.613 11.118c.633.749.115 1.901-.863 1.901H76.113c-.346 0-.691-.173-.864-.403l-4.374-5.185a.54.54 0 00-.864 0l-4.26 5.185c-.23.288-.517.403-.863.403h-12.49c-1.036 0-1.554-1.152-.921-1.901zm12.433 21.66h13.584c.346 0 .633-.288.576-.634-.403-4.032-3.051-6.74-7.195-6.74-4.03 0-6.908 2.708-7.54 6.683-.058.345.23.69.575.69zM112.145 63.136h-11.857a1.155 1.155 0 01-1.151-1.152v-42.34c0-.634.518-1.153 1.151-1.153h10.706c.633 0 1.151.519 1.151 1.152v2.823c0 .519.634.75.979.403 3.281-3.283 7.137-5.184 12.26-5.184 8.807 0 15.023 5.876 15.023 16.763v27.536c0 .633-.518 1.152-1.151 1.152h-11.857a1.155 1.155 0 01-1.151-1.152V39.172c0-5.645-2.015-8.699-6.274-8.699-3.454 0-6.62 2.477-6.62 9.217v22.351c-.057.576-.575 1.095-1.209 1.095zM174.08 60.256c0-.519-.633-.75-.979-.404-2.993 2.823-6.619 4.148-11.799 4.148-9.268 0-15.484-5.53-15.484-13.998 0-8.699 7.022-13.422 19.801-13.422 2.129 0 4.144.115 5.871.403.345.058.691-.23.691-.576v-1.498c0-3.975-2.303-6.049-6.217-6.049-3.396 0-6.217 1.671-6.677 5.07-.058.576-.576.98-1.151.98h-10.361c-.691 0-1.266-.635-1.151-1.326 1.381-9.044 9.497-15.841 19.398-15.841 12.26 0 19.455 6.624 19.455 17.915V62.04c0 .634-.518 1.153-1.151 1.153h-9.152a1.155 1.155 0 01-1.152-1.153v-1.785h.058zm-9.497-6.049c4.72 0 7.54-2.247 7.54-5.876V45.97c0-.288-.23-.518-.461-.576-1.957-.345-3.453-.518-5.18-.518-4.835 0-7.368 1.555-7.368 4.666 0 2.88 2.015 4.666 5.469 4.666zM193.766 61.984V4.724c0-.634.518-1.152 1.151-1.152h12.03c.633 0 1.151.518 1.151 1.152v57.26c0 .633-.518 1.152-1.151 1.152h-12.03a1.155 1.155 0 01-1.151-1.152zM224.215 16.187c-5.411 0-9.095-3.399-9.095-8.065C215.12 3.4 218.862 0 224.215 0c5.353 0 9.094 3.399 9.094 8.122 0 4.667-3.741 8.065-9.094 8.065zm-6.965 45.797v-42.34c0-.634.518-1.152 1.151-1.152h11.857c.634 0 1.152.518 1.152 1.152v42.34c0 .633-.518 1.152-1.152 1.152h-11.857a1.155 1.155 0 01-1.151-1.152zM258.866 64c-12.03 0-19.973-5.76-21.47-15.266-.115-.69.461-1.325 1.151-1.325h11.225c.575 0 1.036.404 1.151.98.46 3.168 3.281 5.184 7.713 5.184 4.087 0 6.619-1.267 6.619-3.456 0-1.383-1.496-2.42-4.547-2.995l-8.807-1.556c-7.77-1.382-12.778-5.876-12.778-13.134 0-8.64 8.116-14.747 18.995-14.747 11.167 0 19.052 5.76 20.491 14.92.115.691-.46 1.325-1.151 1.325h-11.339c-.576 0-.979-.404-1.152-.922-.69-3.053-3.28-4.896-6.792-4.896-3.338 0-5.468 1.325-5.468 3.34 0 1.326 1.324 2.132 4.202 2.65l9.44 1.729c8.634 1.555 13.181 5.703 13.181 12.212.058 9.793-8.001 15.957-20.664 15.957zM305.663 64c-10.015 0-15.887-5.991-15.887-16.187v-16.36c0-.346-.23-.576-.575-.576h-6.562a1.155 1.155 0 01-1.151-1.152V19.642c0-.633.518-1.152 1.151-1.152h6.562c.345 0 .575-.23.575-.576V6.567c0-.634.519-1.152 1.152-1.152h11.857c.633 0 1.151.518 1.151 1.152v11.406c0 .346.231.576.576.576h10.476c.633 0 1.151.518 1.151 1.152v10.081c0 .634-.518 1.152-1.151 1.152h-10.476c-.345 0-.576.23-.576.576v13.02c0 4.32 1.842 6.278 5.699 6.278 1.612 0 3.223-.288 4.547-.806.748-.288 1.554.288 1.554 1.094v9.793c0 .403-.23.807-.633 1.037-2.878 1.44-5.698 2.074-9.44 2.074zM348.603 60.256c0-.519-.633-.75-.979-.404-2.993 2.823-6.619 4.148-11.799 4.148-9.268 0-15.484-5.53-15.484-13.998 0-8.699 7.022-13.422 19.801-13.422 2.129 0 4.144.115 5.871.403.345.058.69-.23.69-.576v-1.498c0-3.975-2.302-6.049-6.216-6.049-3.396 0-6.217 1.671-6.677 5.07-.058.576-.576.98-1.151.98h-10.361c-.691 0-1.266-.635-1.151-1.326 1.381-9.044 9.497-15.841 19.397-15.841 12.261 0 19.456 6.624 19.456 17.915V62.04c0 .634-.518 1.153-1.151 1.153h-9.152a1.155 1.155 0 01-1.152-1.153l.058-1.785zm-9.44-6.049c4.72 0 7.54-2.247 7.54-5.876V45.97c0-.288-.23-.518-.46-.576-1.957-.345-3.454-.518-5.18-.518-4.836 0-7.368 1.555-7.368 4.666 0 2.88 2.014 4.666 5.468 4.666z"
        fill={theme.green}
      />
    </Svg>
  );
};

export default memo(Typo);
