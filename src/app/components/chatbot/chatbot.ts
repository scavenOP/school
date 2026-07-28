import {
  Component, signal, computed, ElementRef, ViewChild,
  AfterViewChecked, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ChatMessage {
  id: number;
  from: 'bot' | 'user';
  text: string;
  time: string;
  options?: QuickOption[];
  typing?: boolean;
}

export interface QuickOption {
  label: string;
  value: string;
  icon: string;
}

const QUICK_OPTIONS: QuickOption[] = [
  { label: 'Admissions',   value: 'admissions',  icon: '📋' },
  { label: 'Programs',     value: 'programs',    icon: '🎨' },
  { label: 'Fees',         value: 'fees',        icon: '💰' },
  { label: 'Timings',      value: 'timings',     icon: '⏰' },
  { label: 'Location',     value: 'location',    icon: '📍' },
  { label: 'Faculty',      value: 'faculty',     icon: '👩‍🏫' },
  { label: 'Activities',   value: 'activities',  icon: '🏃' },
  { label: 'Contact',      value: 'contact',     icon: '📞' },
];

interface KBEntry { keywords: string[]; response: string; }

const KNOWLEDGE_BASE: KBEntry[] = [
  {
    keywords: ['admission', 'enroll', 'join', 'register', 'apply', 'enrollment', 'registration'],
    response: `📋 <strong>Admissions at Sunshine Kids</strong><br><br>
We welcome children aged <strong>1.5 to 6 years</strong>! Here's how to enroll:<br>
① Fill the online admission form on our website<br>
② Submit documents: birth certificate, photos & parent ID<br>
③ Schedule a school visit & interaction session<br>
④ Confirm seat with initial fee payment<br><br>
🗓️ Admissions open: <strong>April – July</strong> every year.<br>
Want to book a visit? Call <strong>+91 98765 43210</strong>!`
  },
  {
    keywords: ['program', 'curriculum', 'class', 'course', 'syllabus', 'subject', 'playgroup', 'nursery', 'kg', 'kindergarten', 'pre-k'],
    response: `🎨 <strong>Our Programs</strong><br><br>
We offer age-appropriate programs:<br>
🍼 <strong>Playgroup</strong> (1.5–2.5 yrs) — Sensory play & social skills<br>
🌱 <strong>Nursery</strong> (2.5–3.5 yrs) — Language, creativity & motor skills<br>
⭐ <strong>LKG</strong> (3.5–4.5 yrs) — Foundational literacy & numeracy<br>
🚀 <strong>UKG</strong> (4.5–6 yrs) — School readiness & critical thinking<br><br>
All programs use the <strong>play-based learning</strong> approach with Montessori elements.`
  },
  {
    keywords: ['fee', 'fees', 'cost', 'price', 'tuition', 'charges', 'payment', 'amount', 'money'],
    response: `💰 <strong>Fee Structure</strong><br><br>
Our fees are affordable & transparent:<br>
🍼 <strong>Playgroup</strong>: ₹2,500/month<br>
🌱 <strong>Nursery</strong>: ₹3,000/month<br>
⭐ <strong>LKG</strong>: ₹3,500/month<br>
🚀 <strong>UKG</strong>: ₹4,000/month<br><br>
📌 One-time registration fee: ₹5,000<br>
💡 Sibling discount available (10% off second child).<br>
For detailed fee structure, contact our office.`
  },
  {
    keywords: ['timing', 'time', 'schedule', 'hours', 'open', 'close', 'morning', 'afternoon', 'shift'],
    response: `⏰ <strong>School Timings</strong><br><br>
📅 <strong>Monday to Saturday</strong><br>
🌅 Morning Shift: <strong>7:30 AM – 11:30 AM</strong><br>
☀️ Afternoon Shift: <strong>12:00 PM – 4:00 PM</strong><br><br>
🏖️ School is closed on Sundays & public holidays.<br>
📞 Office hours: <strong>8:00 AM – 5:00 PM</strong> (Mon–Sat)`
  },
  {
    keywords: ['location', 'address', 'where', 'kolkata', 'direction', 'map', 'place', 'find us', 'nearby'],
    response: `📍 <strong>Our Location</strong><br><br>
🏫 <strong>Sunshine Kids Preschool</strong><br>
123 Rainbow Lane, Salt Lake City<br>
Kolkata, West Bengal – 700091<br><br>
🚌 Near City Centre Mall, Salt Lake<br>
🚇 Closest Metro: Salt Lake Sector V<br><br>
📱 <a href="https://maps.google.com" target="_blank" style="color:#FF6B35">Open in Google Maps ↗</a>`
  },
  {
    keywords: ['faculty', 'teacher', 'staff', 'educator', 'trainer', 'principal', 'team', 'coach'],
    response: `👩‍🏫 <strong>Our Faculty</strong><br><br>
Our team of <strong>20+ dedicated educators</strong> brings warmth & expertise:<br>
✅ All teachers are B.Ed / ECE certified<br>
✅ Average experience: <strong>8+ years</strong><br>
✅ Regular training in child psychology & pedagogy<br>
✅ 1:10 teacher-to-student ratio (best in Kolkata!)<br><br>
🌟 Led by our Principal <strong>Mrs. Priya Sharma</strong> (M.Ed, 15 yrs exp.)`
  },
  {
    keywords: ['activity', 'activities', 'event', 'sport', 'art', 'craft', 'dance', 'music', 'yoga', 'extracurricular', 'extra'],
    response: `🏃 <strong>Activities & Events</strong><br><br>
We believe in holistic development!<br>
🎨 Art & Craft workshops every Friday<br>
🎵 Music & Rhythm classes (daily)<br>
💃 Dance & Drama sessions (weekly)<br>
🧘 Yoga for Kids (3× per week)<br>
📚 Storytelling & Show & Tell<br>
🏆 Annual Sports Day, Fancy Dress & Cultural Fests<br><br>
Every child gets to <strong>shine on stage!</strong> ⭐`
  },
  {
    keywords: ['contact', 'phone', 'call', 'email', 'reach', 'number', 'whatsapp', 'message'],
    response: `📞 <strong>Contact Us</strong><br><br>
We'd love to hear from you!<br>
📱 Phone: <strong>+91 98765 43210</strong><br>
📧 Email: <strong>hello@sunshinekids.in</strong><br>
💬 WhatsApp: <strong>+91 98765 43210</strong><br>
🌐 Website: <strong>www.sunshinekids.in</strong><br><br>
🕐 Office Hours: Mon–Sat, 8 AM – 5 PM`
  },
  {
    keywords: ['age', 'eligibility', 'old', 'young', 'year', 'month', 'baby', 'toddler', 'child'],
    response: `👶 <strong>Age Eligibility</strong><br><br>
We welcome little ones from <strong>1.5 years to 6 years</strong>:<br>
🍼 Playgroup: 1.5 – 2.5 years<br>
🌱 Nursery: 2.5 – 3.5 years<br>
⭐ LKG: 3.5 – 4.5 years<br>
🚀 UKG: 4.5 – 6 years<br><br>
Not sure which class? <strong>We'll assess & suggest</strong> the best fit for your child! 😊`
  },
  {
    keywords: ['transport', 'bus', 'van', 'pickup', 'drop', 'cab', 'vehicle'],
    response: `🚌 <strong>Transport Facility</strong><br><br>
We provide safe, GPS-tracked transport:<br>
✅ Air-conditioned mini-vans<br>
✅ Female attendant on every vehicle<br>
✅ Live GPS tracking for parents<br>
✅ Covers major areas of Kolkata<br><br>
💰 Transport fee: ₹800 – ₹1,500/month (based on distance)<br>
📞 Contact office for route details.`
  },
  {
    keywords: ['safety', 'safe', 'security', 'cctv', 'camera', 'surveillance', 'care'],
    response: `🛡️ <strong>Safety & Security</strong><br><br>
Your child's safety is our top priority:<br>
📹 24/7 CCTV surveillance throughout campus<br>
🔐 Biometric entry for parents & staff<br>
👩‍⚕️ On-site nurse & first-aid facility<br>
🚫 Strict no-stranger policy<br>
📱 Parent app for real-time updates<br><br>
We maintain a <strong>zero-compromise policy</strong> on child safety! 💖`
  },
  {
    keywords: ['food', 'meal', 'lunch', 'snack', 'tiffin', 'nutrition', 'diet', 'eat'],
    response: `🍱 <strong>Food & Nutrition</strong><br><br>
We promote healthy eating habits:<br>
✅ Nutritious mid-morning snacks provided<br>
✅ Children bring home-cooked tiffin for lunch<br>
✅ No junk food / chocolates in school premises<br>
✅ Allergy-friendly snack policy<br><br>
🥗 Monthly nutrition workshops for parents too!`
  },
  {
    keywords: ['holiday', 'vacation', 'break', 'off', 'closed'],
    response: `🗓️ <strong>Holiday Calendar</strong><br><br>
We follow the West Bengal state academic calendar:<br>
☀️ <strong>Summer Break</strong>: May 15 – June 15<br>
🪔 <strong>Durga Puja</strong>: 10 days in October<br>
🎄 <strong>Winter Break</strong>: Dec 24 – Jan 1<br>
📅 All public holidays & state holidays observed<br><br>
Full holiday list shared at the start of each academic year.`
  },
  {
    keywords: ['online', 'virtual', 'digital', 'app', 'portal', 'zoom', 'remote'],
    response: `💻 <strong>Digital Learning</strong><br><br>
We embrace technology for 21st century learning:<br>
📱 <strong>Parent App</strong>: Daily updates, photos & progress reports<br>
🖥️ Interactive smart boards in classrooms<br>
📹 Recorded story sessions & activity videos<br>
💬 Teacher-parent chat via the app<br><br>
Stay connected with your child's journey every day! 🌟`
  },
  {
    keywords: ['hello', 'hi', 'hey', 'namaste', 'good morning', 'good afternoon', 'greet'],
    response: `👋 <strong>Hello there!</strong><br><br>
Welcome to <strong>Sunshine Kids Preschool</strong>! 🌟<br>
I'm <strong>Sunny</strong>, your virtual assistant.<br><br>
How can I help you today? Feel free to ask me anything about our school, or pick an option below! 😊`
  },
  {
    keywords: ['thank', 'thanks', 'thankyou', 'great', 'awesome', 'nice', 'good', 'wonderful'],
    response: `🙏 You're most welcome! We're always happy to help.<br><br>
If you have more questions, feel free to ask! Or call us at <strong>+91 98765 43210</strong> for immediate assistance. 😊<br><br>
Have a <strong>sunshine-filled day!</strong> ☀️`
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'later', 'done', 'quit', 'exit'],
    response: `👋 <strong>Goodbye!</strong><br><br>
Thank you for visiting Sunshine Kids Preschool! 🌈<br>
Hope to see your little one here soon. Have a wonderful day! ☀️<br><br>
<em>Feel free to come back anytime!</em>`
  },
];

const FALLBACK_RESPONSES = [
  `Hmm, I'm not sure about that! 🤔<br>But I can help you with <strong>Admissions, Programs, Fees, Timings, Location, Faculty, Activities</strong> and more.<br><br>You can also reach us at <strong>+91 98765 43210</strong> for any specific queries! 😊`,
  `I didn't quite catch that! 😅<br>Try asking about our <strong>programs, fees, timings</strong> or pick one of the options below. For direct help, call <strong>+91 98765 43210</strong>!`,
  `That's a great question! Our staff can answer it best. 📞<br>Please call <strong>+91 98765 43210</strong> or email <strong>hello@sunshinekids.in</strong>.<br><br>Meanwhile, I can tell you about <strong>admissions, programs, fees</strong> and more! 😊`,
];

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class Chatbot implements AfterViewChecked {
  @ViewChild('messagesContainer') private messagesRef!: ElementRef<HTMLDivElement>;

  isOpen    = signal(false);
  isTyping  = signal(false);
  userInput = signal('');
  messages  = signal<ChatMessage[]>([]);
  private msgId = 0;
  private fallbackIdx = 0;
  private shouldScroll = false;

  private now(): string {
    return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  private addBotMsg(text: string, options?: QuickOption[]): void {
    const msgs = [...this.messages()];
    msgs.push({ id: ++this.msgId, from: 'bot', text, time: this.now(), options });
    this.messages.set(msgs);
    this.shouldScroll = true;
  }

  private addUserMsg(text: string): void {
    const msgs = [...this.messages()];
    msgs.push({ id: ++this.msgId, from: 'user', text, time: this.now() });
    this.messages.set(msgs);
    this.shouldScroll = true;
  }

  toggleChat(): void {
    const opening = !this.isOpen();
    this.isOpen.set(opening);
    if (opening && this.messages().length === 0) {
      setTimeout(() => this.greet(), 400);
    }
  }

  private greet(): void {
    this.isTyping.set(true);
    setTimeout(() => {
      this.isTyping.set(false);
      this.addBotMsg(
        `👋 Hi there! I'm <strong>Sunny</strong> 🌟<br>Your virtual assistant at <strong>Sunshine Kids Preschool</strong>!<br><br>I'm here to answer all your questions. What would you like to know? 😊`,
        QUICK_OPTIONS
      );
    }, 1000);
  }

  onOptionClick(opt: QuickOption): void {
    this.addUserMsg(`${opt.icon} ${opt.label}`);
    this.getBotResponse(opt.value);
  }

  sendMessage(): void {
    const text = this.userInput().trim();
    if (!text) return;
    this.addUserMsg(text);
    this.userInput.set('');
    this.getBotResponse(text);
  }

  onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
  }

  private getBotResponse(input: string): void {
    this.isTyping.set(true);
    const lower = input.toLowerCase();

    const match = KNOWLEDGE_BASE.find(entry =>
      entry.keywords.some(kw => lower.includes(kw))
    );

    const delay = 700 + Math.random() * 600;
    setTimeout(() => {
      this.isTyping.set(false);
      if (match) {
        this.addBotMsg(match.response, QUICK_OPTIONS);
      } else {
        this.addBotMsg(FALLBACK_RESPONSES[this.fallbackIdx % FALLBACK_RESPONSES.length], QUICK_OPTIONS);
        this.fallbackIdx++;
      }
    }, delay);
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  private scrollToBottom(): void {
    try {
      const el = this.messagesRef?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch {}
  }

  get quickOptions(): QuickOption[] { return QUICK_OPTIONS; }
}
