const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="w-full h-dvh flex justify-center items-center">
      {children}
    </main>
  );
};

export default AuthLayout;
