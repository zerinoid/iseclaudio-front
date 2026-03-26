import Image from 'next/image'

export default function Bio() {
  return (
    <section className="pt-10 max-w-7xl lg:m-auto">
      <h1 className="font-bold text-5xl mb-20">ISE - Claudio Duarte</h1>
      <div className="font-sans font-light">
        <p className="mb-12">
          Nascido em 1979, na cidade de São Paulo, autodidata, Claudio Duarte -
          ISE desenvolveu nos muros o traço, a forma e a proporção que
          resultaram na grafia tão reconhecível aos olhos de quem navega pela
          cidade. “É com esse mesmo olhar atento e generoso que percebeu a
          poesia imbuída nos cenários árduos que o rodeiam. E, assim, passou a
          registrar recortes de tempo-espaço transformados em telas”.
        </p>
        <p className="mb-12">
          A pincelada realista produzida em tinta óleo pelo artista não busca,
          no entanto, um mundo mágico e fictício. Ela ressalta a beleza contida
          na própria realidade, naquilo que nossos olhos muitas vezes evitam
          encontrar, mas que está diante de nós. Encontra o belo no tido por
          muitos como não belo. E é a partir desse fragmento que ISE revive tal
          situação horas, ou até anos mais tarde em seu ateliê, recriando com
          tinta a cena flagrada.
        </p>
        <p className="mb-12">
          Em suas telas, ressalta objetos específicos de tais acontecimentos. O
          branco do tecido desaparece e destaca as simbologias do instrumento
          eleito. Descontextualizando, peças simples e cotidianas ganham muitos
          significados e novas narrativas.
        </p>
        <p className="mb-12">
          Fragmentos de um cenário visto pelo artista nas ruas são
          materializados em fotografias clicadas por ele, nas quais o espectador
          pode encontrar algumas de suas vivências que se tornam pinturas. Tais
          momentos flutuam como pensamentos extraviados de seu percurso comum. É
          inspirado nas cenas que desaparecem continuamente que ISE traça seu
          percurso, eternizando e fazendo-as reviverem em outros suportes.
        </p>
        <hr className="mb-12" />
        <p className="mb-12">
          Born in 1979, in São Paulo, self-educated, Cláudio Duarte - ISE used
          the city’s walls to develop the lines, shapes and propotion that
          resulted in his most known letters, frequently recognized from those
          who walk throughout São Paulo. “Within these same watchful and
          generous eyes, he noticed the hidden poetry in the harsh scenarios
          that sorrounds him. That’s when he started to collect space and time
          cuts to transform it into a canvas”.
        </p>

        <p className="mb-12">
          The realistic touch in oil paint does not seek, for instance, a magic
          and unrealistic world. It highlights the beauty in the reality, in
          what our eyes frequently avoid to see but it’s right in front of us.
          It finds beauty in what many consider not beautiful. And from this
          fragment, ISE brings such situation back to life hours or even years
          later inside his studio, recreating the scene with painting.
        </p>

        <p className="mb-12">
          In his canvas, ISE highlights specific objects from these events. The
          white material disappears and gives space to the symbologies of the
          elected tool. In summary, simple pieces from our day-to-day receives
          more meanings and new narratives.
        </p>

        <p className="mb-12">
          Fragments of a scenario seen by the artist in the streets are
          materialized in photographies that he shoot by himself and gives space
          to those who witness it to find any of his/hers experiences in what is
          now art. Those moments often floats as mislay thoughts. It finds
          inspiration in the scenes that disappears frequently and cross ISE’s
          path to now be perpetuated by the artist.
        </p>
      </div>
      <div className="h-[126px] md:h-[302px] w-full overflow-hidden relative">
        <Image
          className="object-cover"
          src="/bio.webp"
          alt="obra"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
        />
      </div>
    </section>
  )
}
