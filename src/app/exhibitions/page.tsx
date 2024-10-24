import Gallery from '@/components/Gallery/Gallery'

const data = [
  { name: 'Lorem Ipsum Dolor Sit Amet', id: 1 },
  { name: 'Consectetur Adipiscing Elit', id: 2 },
  { name: 'Sed Do Eiusmod', id: 3 },
  { name: 'Tempor Incididunt', id: 4 },
  { name: 'Ut Labore', id: 5 }
]

export default function Exhibitions() {
  return (
    <div className="md:grid grid-cols-2">
      <div className="hidden md:block relative">
        <ul className="sticky top-7">
          {data.map(exhibition => (
            <li className="mb-9" key={exhibition.id}>
              <button className="uppercase text-4xl">{exhibition.name}</button>
            </li>
          ))}
        </ul>
      </div>
      <Gallery />
    </div>
  )
}
