import { axiosInstance } from '../app.js'

const websiteEmail = 'dvnhrajput@gmail.com'
const adminEmail = 'trnrajput29@gmail.com'
const adminName = 'Whispering Willow'

export const sendEmailController = async (req, res) => {
    try {
        const { senderName, senderEmail, message, subject } = req.body

        console.log(req.body)

        if (!senderEmail || !senderName || !message) return res.status(404).send({ success: false, message: 'All Fields are required' })

        const htmlBody = `<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Email from Whispering willow</title> <link href="https://fonts.googleapis.com/css2?family=Balsamiq+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Bubblegum+Sans&family=Expletus+Sans:ital,wght@0,400..700;1,400..700&family=Playpen+Sans:wght@100..800&family=Port+Lligat+Sans&family=Sansita+Swashed:wght@300..900&family=Shantell+Sans:ital,wght@0,300..800;1,300..800&family=Sofia+Sans+Semi+Condensed:ital,wght@0,1..1000;1,1..1000&display=swap" rel="stylesheet"></head><body style="font-family: Sansita Swashed, system-ui; padding: 2rem; background-color: #b30036 ; border-radius: 10px; color: white;"> <h3 style="font-weight: 300; margin-bottom: 2rem;">Email from Whispering Willow Customer, </h3> <div style="margin-left: 3rem; font-family: Expletus Sans, sans-serif;"> <h4>Sender's Name: <span style="font-style: italic;">${senderName}</span></h4> <h4>Sender's Email: <span style="font-style: italic;">${senderEmail}</span></h4> <p>${message}</p> </div>\</body></html>`

        const { data } = await axiosInstance.post('https://api.brevo.com/v3/smtp/email', {
            sender: {
                email: websiteEmail,
                name: adminName
            },
            to: [
                {
                    email: adminEmail
                }
            ],
            subject: subject,
            htmlContent: htmlBody
        }, {
            headers: {
                'api-key': `${process.env.BREVO_API_KEY}`
            }
        })

        return res.status(200).send({
            success: true,
            data
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Something went Wrong in send Email Controller'
        })
    }
}


