import Link from 'next/link';
import './404.css'

export default function NotFound() {

    return (
        <section className="error__page">
            <div className="error__number">404</div>
            <div className="text">Такой страницы не существует</div>

            <div className='buttons__back'>
                <Link href="/">Вернуться на сайт</Link>
            </div>
        </section>
    );
}
