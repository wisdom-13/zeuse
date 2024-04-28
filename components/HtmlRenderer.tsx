interface HtmlRendererProps {
  htmlContent: string;
}

const HtmlRenderer = ({ htmlContent }: HtmlRendererProps) => {
  return (
    <div className='overflow-hidden w-full' dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default HtmlRenderer;