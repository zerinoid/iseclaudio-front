import Gallery from '@/components/Gallery/Gallery'
import WorkListing from '@/components/WorkListing/WorkListing'
import exhibitions from '@/mocks/exhibitions'

export default function Exhibitions() {
  return (
    <div className="md:grid grid-cols-2 md:w-11/12">
      <div className="hidden md:block relative">
        <div className="sticky top-7">
          <h1 className="font-bold text-5xl mb-12">EXHIBITIONS:</h1>
          <WorkListing works={exhibitions} />
        </div>
      </div>
      <Gallery />
    </div>
  )
}
