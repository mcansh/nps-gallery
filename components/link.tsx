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

type Props = LinkProps & { children: React.ReactElement };

const MyLink = (nextLinkProps: Props) => {
  const { href, children } = nextLinkProps;
  const isSameOrigin = checkSameOrigin(href);

  if (!isSameOrigin) {
    const child = React.Children.only(children);
    return React.cloneElement(child, {
      href: typeof href === 'string' ? href : format(href),
      target: '_blank',
      rel: 'noopener external noreferrer',
    });
  }

  return <Link {...nextLinkProps}>{children}</Link>;
};

export { checkSameOrigin, MyLink as Link };
