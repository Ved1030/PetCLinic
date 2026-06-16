import { Appointment, TimeSlot } from "../types";

const appointments: Appointment[] = [];

const SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30",
];

const SLOT_DISPLAY: Record<string, string> = {
  "09:00": "9:00 AM", "09:30": "9:30 AM",
  "10:00": "10:00 AM", "10:30": "10:30 AM",
  "11:00": "11:00 AM", "11:30": "11:30 AM",
  "12:00": "12:00 PM", "12:30": "12:30 PM",
  "14:00": "2:00 PM", "14:30": "2:30 PM",
  "15:00": "3:00 PM", "15:30": "3:30 PM",
  "16:00": "4:00 PM", "16:30": "4:30 PM",
  "17:00": "5:00 PM", "17:30": "5:30 PM",
};

function normalizePhone(phone: string): string {
  return phone.replace(/[\s\-\(\)]/g, "");
}

function seedAppointments() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);

  const fmt = (d: Date) => d.toISOString().split("T")[0];

  const bookedSlot: Appointment = {
    id: "apt_seeded_1",
    petName: "Max",
    petType: "Dog",
    breed: "Golden Retriever",
    ownerName: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "9876543210",
    service: "Veterinary Consultation",
    date: fmt(dayAfter),
    time: "10:00",
    reason: "Annual checkup",
    status: "booked",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const bookedSlot2: Appointment = {
    id: "apt_seeded_2",
    petName: "Bella",
    petType: "Cat",
    breed: "Persian",
    ownerName: "Priya Patel",
    email: "priya@example.com",
    phone: "9876543211",
    service: "Vaccination",
    date: fmt(tomorrow),
    time: "14:00",
    reason: "Annual vaccination",
    status: "booked",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  appointments.push(bookedSlot, bookedSlot2);
}

seedAppointments();

export const appointmentService = {
  async getAll(): Promise<Appointment[]> {
    return appointments.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  async getById(id: string): Promise<Appointment | undefined> {
    return appointments.find((a) => a.id === id);
  },

  async getByDate(date: string): Promise<Appointment[]> {
    return appointments.filter((a) => a.date === date);
  },

  async getSlots(date: string): Promise<TimeSlot[]> {
    const now = new Date();
    const requestDate = new Date(date + "T00:00:00");
    const isToday = requestDate.toDateString() === now.toDateString();
    const isPast = requestDate < new Date(now.toDateString());

    const bookedTimes = appointments
      .filter((a) => a.date === date && a.status === "booked")
      .map((a) => a.time);

    const bookedSlots: string[] = [...bookedTimes];

    return SLOTS.map((time) => {
      let status: TimeSlot["status"] = "available";

      if (isPast) {
        status = "unavailable";
      } else if (bookedSlots.includes(time)) {
        status = "booked";
      } else if (isToday) {
        const [h, m] = time.split(":").map(Number);
        const slotTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
        if (slotTime <= now) {
          status = "past";
        }
      }

      return {
        time,
        display: SLOT_DISPLAY[time] || time,
        status,
      };
    });
  },

  async create(data: Omit<Appointment, "id" | "status" | "createdAt" | "updatedAt">): Promise<Appointment> {
    const appointment: Appointment = {
      ...data,
      phone: normalizePhone(data.phone),
      id: `apt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      status: "booked",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    appointments.push(appointment);
    return appointment;
  },

  async update(
    id: string,
    data: Partial<Omit<Appointment, "id" | "createdAt">>
  ): Promise<Appointment | undefined> {
    const index = appointments.findIndex((a) => a.id === id);
    if (index === -1) return undefined;
    appointments[index] = {
      ...appointments[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return appointments[index];
  },

  async delete(id: string): Promise<boolean> {
    const index = appointments.findIndex((a) => a.id === id);
    if (index === -1) return false;
    appointments.splice(index, 1);
    return true;
  },
};
