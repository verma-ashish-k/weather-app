import Image from 'next/image';

interface Section {
  heading: string;
  icon: string;
  text: string;
}

export interface CardProps {
  mainHeading: string;
  mainIcon: string;
  mainText: string;
  temperature: string;
  sections: Section[];
  selectedCity: string;
  forecast?: {
    date: string;
    day: {
      avgtemp_c: number;
      condition: {
        text: string;
      };
    };
  }[];
}

const Card: React.FC<CardProps> = ({
  mainHeading,
  mainIcon,
  mainText,
  temperature,
  sections,
  selectedCity,
  forecast,
}) => {
  return (
    <div className='shadow-lg p-0 bg-sky-100 rounded-lg grid grid-cols-1 border-4 border-white'>
      <div className='p-6 flex flex-col items-center justify-center border-b-2 border-white'>
        <h2
          className='text-2xl font-extralight mb-4'
          style={{
            fontFamily: 'var(--font-kumbh-sans), sans-serif',
          }}
        >
          {mainHeading}
        </h2>
        <div className='flex items-center justify-center'>
          <Image src={mainIcon} alt='main-icon' width={100} height={100} />
          <div className='ml-2 items-start'>
            <p
              className='text-6xl text-left'
              style={{ fontFamily: 'var(--font-teko), sans-serif' }}
            >
              {temperature}
              {'°'}
            </p>
            <p className='mb-2 text-xl text-left font-extralight tracking-wide'>
              {mainText}
            </p>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-4 gap-0 border-t-2 border-white'>
        {sections.map((section, index) => {
          const weather =
            forecast && index < forecast.length ? forecast[index] : null;

          const forecastTemp = weather ? weather.day.avgtemp_c.toString() : '';

          return (
            <div
              key={index}
              className={`p-6 flex flex-col items-center justify-center ${
                index < sections.length - 1 ? 'border-r-2 border-white' : ''
              }`}
            >
              <h3 className='text-m font-extralight mb-2'>{section.heading}</h3>
              <Image
                src={section.icon}
                alt='weather-icon'
                width={50}
                height={50}
              />
              <p
                className='mt-2 text-xl'
                style={{ fontFamily: 'var(--font-teko), sans-serif' }}
              >
                {section.text}
                {'°'}
              </p>
              <p className='mt-2 text-sm font-extralight'>{forecastTemp}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
