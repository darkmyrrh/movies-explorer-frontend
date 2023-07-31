import './AboutProject.css'

function AboutProject() {
    return (
        <section className='about-project'>
            <h2 className='about-project__heading'>О проекте</h2>
            <article>
                <h3 className='about-project__title'>Дипломный проект включал 5 этапов</h3>
                <p className='about-project__paragraph'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </article>
            <article>
                <h3 className='about-project__title'>На выполнение диплома ушло 5 недель</h3>
                <p className='about-project__paragraph'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </article>
            <div className='about-project__process'>
                <div className='about-project__process-scale'>1 неделя</div>
                <p className='about-project__process-text'>Back-end</p>
                <div className='about-project__process-scale'>4 недели</div>
                <p className='about-project__process-text'>Front-end</p>
            </div>
        </section>
    )
}

export default AboutProject;