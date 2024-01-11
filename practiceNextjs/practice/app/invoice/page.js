"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link';

const page = () => {
    const [details, setDetails] = useState({ quantity: '', cost: '', margin: '', discount: '', tax: '' });
    const [data, setData] = useState([]);
    const [endValue, setEndValue] = useState(0);
    // setDetails({...details,[event.target.name]:event.target.value})
    const handleChange = (event) => {
        const { name, value } = event.target;

        // Update the details state based on the input changes
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };
    const handleChangeSection = (event, index) => {
        const updatedData = [...data];
        console.log(updatedData)
        const { name, value } = event.target;

        // Ensure the data array at the given index is initialized
        if (!updatedData[index]) {
            updatedData[index] = { quantity: '', cost: '', margin: '', discount: '', tax: '', endValue: 0 };
        }

        // Update the edited value in the data array
        updatedData[index][name] = value;

        // Recalculate end value based on the updated values
        const result = calculateEndValue(
            parseFloat(updatedData[index].quantity),
            parseFloat(updatedData[index].cost),
            parseFloat(updatedData[index].margin),
            parseFloat(updatedData[index].discount),
            parseFloat(updatedData[index].tax)
        );

        // Update the endValue in the data array
        updatedData[index].endValue = result;

        // Update the endValue state
        setEndValue(result);

        // Update the data state
        setData(updatedData);
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        if (details.quantity && details.cost && details.margin && details.discount && details.tax) {
            const result = calculateEndValue(
                parseFloat(details.quantity),
                parseFloat(details.cost),
                parseFloat(details.margin),
                parseFloat(details.discount),
                parseFloat(details.tax)
            );

            setData([...data, { ...details, endValue: result }]);
            setEndValue(result);
            setDetails({ quantity: '', cost: '', margin: '', discount: '', tax: '' });
        } else {
            alert('All fields are mandatory');
        }
    };

    function calculateEndValue(quantity, cost, margin, discount, tax) {
        if (isNaN(quantity) || isNaN(cost) || isNaN(margin) || isNaN(discount) || isNaN(tax)) {
            // Handle invalid input
            return 0;
        }

        const sellingPrice = cost * (1 + margin / 100);
        const discountedPrice = sellingPrice * (1 - discount / 100);
        const finalPrice = discountedPrice * (1 + tax / 100);
        const endValue = quantity * finalPrice;

        return endValue;
    }

    useEffect(() => {
        // You can perform any additional logic here when 'data' or 'endValue' changes
    }, [data, endValue]);

    return (
        <div className=' border-2 bg-slate-200 invoice'>
            <h1 className=' text-2xl mb-10'>Invoice Calculator</h1>
            <form action="" className='form' onSubmit={handleSubmit}>
                <label htmlFor="quantity">Quantity</label><br />
                <input className='w-50 border-2 border-red-400' type="number" name="quantity" value={details.quantity} onChange={handleChange} /><br /><br />
                <label htmlFor="cost">Cost Price</label><br />
                <input className='w-50 border-2 border-red-400' type="number" name="cost" value={details.cost} onChange={handleChange} /><br /><br />
                <label htmlFor="margin">Margin%</label><br />
                <input className='w-50 border-2 border-red-400' type="number" name="margin" value={details.margin} onChange={handleChange} /><br /><br />
                <label htmlFor="discount">Discount%</label><br />
                <input className='w-50 border-2 border-red-400' type="number" name="discount" value={details.discount} onChange={handleChange} /><br /><br />
                <label htmlFor="tax">Tax%</label><br />
                <input className='w-50 border-2 border-red-400' type="number" name="tax" value={details.tax} onChange={handleChange} /><br /><br />
                <button type="submit" className=' p-3 bg-green-300 mb-5'>Submit</button>
            </form>

            <section>
                <div className='list-input'>
                    {data?.length ? (
                        <div>
                            <div  className='heading'>
                                <div htmlFor="">Quantity</div>
                                <div  htmlFor="">Cost Price</div>
                                <div  htmlFor="">Margin%</div>
                                <div  htmlFor="">Discount%</div>
                                <div  htmlFor="">Tax%</div>
                                <div  htmlFor="">EndValue</div>
                            </div>
                            {data.map((d, index) => (
                                <div className='flex' key={index}>
                                    {/* <h3>Data Set {index + 1}</h3> */}
                                    <div>
                                        {/* <label htmlFor={`quantity${index}`}>Quantity:</label> */}
                                        <input type="number" name="quantity" value={d.quantity} onChange={(e) => handleChangeSection(e, index)} />
                                    </div>
                                    <div>
                                        {/* <label htmlFor={`cost${index}`}>Cost Price:</label> */}
                                        <input type="number" name="cost" value={d.cost} onChange={(e) => handleChangeSection(e, index)} />
                                    </div>
                                    <div>
                                        {/* <label htmlFor={`margin${index}`}>Margin%:</label> */}
                                        <input type="number" name="margin" value={d.margin} onChange={(e) => handleChangeSection(e, index)} />
                                    </div>
                                    <div>
                                        {/* <label htmlFor={`discount${index}`}>Discount%:</label> */}
                                        <input type="number" name="discount" value={d.discount} onChange={(e) => handleChangeSection(e, index)} />
                                    </div>
                                    <div>
                                        {/* <label htmlFor={`tax${index}`}>Tax%:</label> */}
                                        <input type="number" name="tax" value={d.tax} onChange={(e) => handleChangeSection(e, index)} />
                                    </div>
                                    <div>
                                        {/* <label htmlFor={`endValue${index}`}>End Value:</label> */}
                                        <input type="number" name="endValue" value={d.endValue} readOnly />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>Add data</div>
                    )}
                </div>
            </section>
                        <Link href='/'className='back'><button> <i class="fa-solid fa-arrow-left"></i> home</button></Link>
        </div>
    );
}

export default page
