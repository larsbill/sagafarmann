interface PageHeaderProps {
  title: string;
  description?: string;
  imageUrl?: string;
}

export default function PageHeader({ title, description, imageUrl }: PageHeaderProps) {
  return (
    <div className="relative h-96 w-full rounded-md overflow-hidden mt-16 mb-10">
      <img src={!!imageUrl ? imageUrl : '/assets/images/expedition_1.jpg'} alt="Page header background image" className="absolute inset-0 h-96 w-full object-cover brightness-[0.65] blur-sm -z-[1]" />
      <div className='flex flex-col gap-4 h-full w-full items-center justify-center z-10'>
        <h1 className='text-5xl md:text-6xl text-center font-bold uppercase'>{title}</h1>
        {!!description && (<p className="text-base md:text-lg text-center max-w-screen-sm">{description}</p>)}
      </div>
    </div>
  )
}