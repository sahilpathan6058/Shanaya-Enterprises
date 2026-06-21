import CustomerRequest from '../models/CustomerRequest.js'

export async function createRequest(req, res, next) {
  try {
    const { name, phone, service, message } = req.body

    if (!name || !phone || !service) {
      return res.status(400).json({ message: 'Name, phone, and service are required' })
    }

    const customerRequest = await CustomerRequest.create({
      name: name.trim(),
      phone: phone.trim(),
      service: service.trim(),
      message: message?.trim() || '',
    })

    res.status(201).json({ request: customerRequest, message: 'Enquiry submitted successfully' })
  } catch (error) {
    next(error)
  }
}

export async function getRequests(req, res, next) {
  try {
    const { status } = req.query
    const filter = status ? { status } : {}
    const requests = await CustomerRequest.find(filter).sort({ createdAt: -1 })
    res.json({ requests })
  } catch (error) {
    next(error)
  }
}

export async function getRequest(req, res, next) {
  try {
    const customerRequest = await CustomerRequest.findById(req.params.id)
    if (!customerRequest) {
      return res.status(404).json({ message: 'Request not found' })
    }
    res.json({ request: customerRequest })
  } catch (error) {
    next(error)
  }
}

export async function updateRequest(req, res, next) {
  try {
    const { status, adminNotes } = req.body
    const updates = {}

    if (status) updates.status = status
    if (adminNotes !== undefined) updates.adminNotes = adminNotes

    const customerRequest = await CustomerRequest.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    })

    if (!customerRequest) {
      return res.status(404).json({ message: 'Request not found' })
    }

    res.json({ request: customerRequest })
  } catch (error) {
    next(error)
  }
}

export async function deleteRequest(req, res, next) {
  try {
    const customerRequest = await CustomerRequest.findByIdAndDelete(req.params.id)
    if (!customerRequest) {
      return res.status(404).json({ message: 'Request not found' })
    }
    res.json({ message: 'Request deleted' })
  } catch (error) {
    next(error)
  }
}
