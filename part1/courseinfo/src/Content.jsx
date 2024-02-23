import React from 'react'

const Content = ({part1,part2,part3,exercises1,exercises2,exercises3}) => {
    return(
        <div>
            <div>
                <p>
                    {part1} {exercises1}
                </p>
            </div>

            <div>
                <p>
                    {part2} {exercises2}
                </p>
            </div>

            <div>
                <p>
                    {part3} {exercises3}
                </p>
            </div>
        </div>
        
    )

}

export default Content