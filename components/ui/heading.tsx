interface HeadingProps {
  title: string;
  description?: string;
}

export const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      {description ? (
        <p className="text-base text-orange-500 font-medium">{description}</p>
      ) : null}
    </div>
  );
};
