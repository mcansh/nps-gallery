import { format, parse, UrlObject } from 'url';

import React from 'react';
import Link, { LinkProps } from 'next/link';

function checkSameOrigin(url: UrlObject | string) {
  const href = typeof url === 'string' ? parse(url) : url;
  if (!href.protocol || !href.hostname) return true;
  if (!/^https?/.test(href.protocol)) return false;
  const domain =
    process.env.NODE_ENV === 'development'
      ? `localhost:${process.env.PORT}`
      : 'npsgallery.loganmcansh.com';
  return href.hostname === domain;
}

const MyLink: React.FC<LinkProps> = ({
  children,
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref,
  prefetch,
}) => {
  const isSameOrigin = checkSameOrigin(href);

  const nextLinkProps = {
    href,
    as,
    replace,
    scroll,
    shallow,
    passHref,
    prefetch,
  };

  if (!isSameOrigin) {
    return (
      <>
        {React.Children.map(children, child =>
          React.cloneElement(child as any, {
            href: typeof href === 'string' ? href : format(href),
            target: '_blank',
            rel: 'noopener external noreferrer',
          })
        )}
      </>
    );
  }

  return <Link {...nextLinkProps}>{children}</Link>;
};

export default MyLink;
export { checkSameOrigin };
