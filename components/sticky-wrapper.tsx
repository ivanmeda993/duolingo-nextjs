interface IStickyWrapper {
  children?: React.ReactNode;
}
export const StickyWrapper = ({ children }: IStickyWrapper) => {
  return (
    <div className="hidden lg:block w-[368px] sticky self-end bottom-6">
      <div className="min-h-[calc(100dvh-48px)] sticky top-6 flex flex-col gap-y-4">
        {children}
      </div>
    </div>
  );
};
