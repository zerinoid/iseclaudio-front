import Gallery from '@/components/Gallery/Gallery'
import exhibitions from '@/mocks/exhibitions'

export default function Exhibitions() {
  return (
    <div className="md:grid grid-cols-2 md:w-11/12">
      <div className="hidden md:block relative">
        <ul className="sticky top-7">
          {exhibitions.map(exhibition => (
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
