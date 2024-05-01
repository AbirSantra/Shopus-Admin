interface SubheadingProps {
  title: string;
  description?: string;
}

export const Subheading = ({ title, description }: SubheadingProps) => {
  return (
    <div className="space-y-1">
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      {description ? (
        <p className="text-sm text-muted-foreground font-medium">
          {description}
        </p>
      ) : null}
    </div>
  );
};
