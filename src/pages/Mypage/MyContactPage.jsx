import ContactComponents from '@/components/Contact/contactComponents';

const MyContactPage = () => {
  return (
    <>
      <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px">
        <h6 className="mb-1 fs-40 fw-400 pb-2 border-bottom border-2 border-black text-start text-black">
          문의하기
        </h6>
        <section className="p-0">
          <div className="pt-1 text-black">
            <ContactComponents />
          </div>
        </section>
      </div>
    </>
  );
};

export default MyContactPage;
