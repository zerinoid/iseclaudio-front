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
      <div className="hidden md:block sticky">
        <ul>
          {data.map(exhibition => (
            <li key={exhibition.id}>{exhibition.name}</li>
          ))}
        </ul>
      </div>
      <Gallery />
    </div>
  )
}
